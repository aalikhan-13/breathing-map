import pandas as pd

# Load the raw datasets
ses = pd.read_csv('County_SES_index_quintile.csv')
pm25 = pd.read_csv('County_annual_PM25_CMR.csv')

# Isolate 2010 data
pm25_2010 = pm25[pm25['Year'] == 2010]

# Merge on FIPS code
merged = pd.merge(
    ses[['FIPS', 'SES_quintile_2010']],
    pm25_2010[['FIPS', 'PM2.5', 'CMR']],
    on='FIPS',
    how='inner'
)

# Clean up column names
merged.rename(columns={
    'SES_quintile_2010': 'SES',
    'PM2.5': 'pm25',
    'CMR': 'cmr'
}, inplace=True)

# Save to a single file for p5.js
merged.to_csv('SES_PM25_CMR_2010.csv', index=False)

print(f"✅ Merged dataset saved as 'SES_PM25_CMR_2010.csv' with {len(merged)} rows.")
print(merged.head())
