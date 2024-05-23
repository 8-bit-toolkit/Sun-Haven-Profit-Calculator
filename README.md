![Title Image Sun Haven Crop Calculator](images/withBG.png)


# Sun Haven Crop Calculator
This static webpage is a calculator that accepts numerous user-configured fields to calculate useful information regarding crops in Sun Haven. This calculator can be used to calculate:
* Total Profit from individual crop sales
* Daily ROI from individual crops
* How many harvested crops to expect over a period of time
* Total amount spent on seeds
* And more!

This calculator runs purely on HTML/Javascript/CSS. It employs the use of the [D3 javascript data-visualization library](https://d3js.org/) to illustrate information in a handy bar-chart.

This calculator does not use any testing libraries, CSS pre-processors, or templating frameworks.

Future plans for this calculator include but are not limited to:
1. Foreign language support
2. Improved search engine optimization
3. Removal of certain assumptions (listed in the disclaimers portion at the bottom of the calculator) upon developer confirmation
4. Implementation of new crops/mechanics released as part of Sun Haven V1.4

# How To Use
To use this calculator, fill out the form with the details you want to calculate in your specific situation. This will mean things like:
1. The day and season you intend to plant your crops
2. What region you are planting crops in
3. Your players level for various skills that may affect crop growth or harvests
4. If you intend to use fertilizers or totems

Once these details are populated, simply click the "Generate Graph" button to see a bar graph that shows various pieces of information about the different crops you could choose to plant. If you are viewing this calculator on a mobile device or a small browser window, you may need to horizontally scroll the screen to view the entire bar graph.

To make changes to the graph, update the initial form values, and click the "Update Graph" button that has replaced the original "Generate Graph" button. It's worth noting that if you update the "region", the graph will go away since each region has their own specific crops.

Individual bars on the bar graph can be hovered over (or tapped on mobile) to view specific information about that crop. This information should hopefully be self-explanatory, but some of the more confusing pieces may be:
* "Unused Days After Last Harvest" - This is an indicator of how many days are leftover after the calculator concludes from the last harvest of this crop. A number higher than 0 here means that the calculator could run for *less* days and still show the same amount of profit or harvests for this crop.
* "ROI (Return On Investment)" - This is a calculation of how much currency this crop will give you **relative to how much you spent on purchasing the seeds for this crop**. This will often correlate to total profit, but in some cases crops may have the highest ROI while not having the highest total profit. A great example of this would be **"Carrots"** which over 6 days have an ROI of 50%. Carrot's seed costs 80 and the crop sells for 115. This means that you get a total profit of 35 currency, which is around 44% of the 80 currency that was initially invested. That's a very high ROI! But, in this same timespan, **"Peppers"** would give a *higher* total profit of 50 currency while having a *lower* ROI of around 29% due to much higher seed costs.
* "Daily ROI" - This is the same ROI metric mentioned above, but divided across all of the days the crop was growing. It's worth noting that the calculation of the daily ROI **does not count "unused" days**. This is to prevent crops that have very long growth periods from showing misleadingly low Daily ROI rates if the calculator is configured to fall at a bad time in their growth period.

Depending on your specific planting situation, different metrics may indicate the best crop for you to be growing. A handy rule of thumb is:
* Look for "Total Profit" if you have a lot of starting wealth, are limited by space, or want the appeal of spending less time watering by focusing on a smaller amount of expensive crops
* Look for "Daily ROI" if you're just starting out and plan to re-invest your profits to purchase *more* crops as soon as possible.

# To Install And Run
This calculator is live at [https://www.sunhavencrops.com](https://www.sunhavencrops.com) but can be run locally by downloading the project and opening the "index.html" file.

# Questions, Suggestions, Requests

Please reach out me directly by email at [8.bit.toolkit@gmail.com](mailto:8.bit.toolkit@gmail.com) or on my [reddit account](https://reddit.com/user/8_bit_toolkit).
