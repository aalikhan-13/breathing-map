# breathing-map
nres 224 midterm -  a visualization of the socioeconomic and environmental status of counties across the US

this project visualizes the instersection of socioeconomic status (ses), air particle pollution (pm2.5), and cardiovascular mortality rate (cmr) across u.s. counties throughout the 2010s. each county is represented by a pulsing circle. the color of the circle is representative of the ses index of the county, which is calculated using factor analysis for several variables including unemployment rates, median household income, education, poverty levels, healthcare facility density, and more. the size of the circle of each circle represents pm2.5 exposure, and the brightness of each circle represents the cmr of that county. the pulsing animation is to draw attention to the systemic inequalities that bring environmental injustice to communities that are struggling economically. lower ses counties often experience higher pollution and increased rates of health issues, as shown by the cmr.
although the circles are representative of real u.s. counties, their location on the map has been randomized to emphaisze the relationships and disparities between the variables rather than precise geographic patterns. this project is meant to highlight the connection between socioeconomic inequality, environmental hazards, and significant health impacts.

the datasets i used for this project are from the US EPA and can be found within the project files. I cleaned and merged multiple datasets into the file labeled 'SES_PM25_CMR_2010.csv'.

view the result at: [https://aalikhan-13.github.io/breathing-map/](url)
