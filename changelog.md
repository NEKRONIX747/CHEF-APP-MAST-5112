First change i had made to the app since part 2 is the refactoring into different sub folders inside a folder called src
i created the sub folder called components 
i created the folder called constants
i created the sub folder called styles 
i created the sub folder called types 
i created the sub folder called utils
i then moved all the screen coding from the app.tsx into the respectiv files
first the home screen
second the addmenuitem screen 
third the guestview screen 
i then took all the calculations and error handling and moved the code to the utils sub folder
first the calculations into the calculations file 
second the error handling into the helpers file
i then took the images and moved them into the constants sub folder 
i moved the images into the images file
i then took all the shared styles and moved them into the styles folder 
i moved them into the sharedstyles file
i then created a folder called types to update the index.ts by creating a new index.ts file
once i had everything refactored and organised i then proceeded to update the UI and UX design of the app
first i changed the look of the home pages average pricing display 
second i added an overall average price display 
third i removed the remove menu item function from the home page 
fourth i added little images above the average course price box
fifth i added the remove menu items to the addmenuitem screen 
sixth i fixed the text to string error
seventh i added small images next to each course on the addmenu item screen
eightth i fixed the text displaying in different areas in the boxes of the app 
nineth i added images next to the courses on the guest view page 
tenth i stored all menu items and descriptions in an array 
eleventh i made it so that those menu items can be removed from the array 
twelfth i made it so the pricing is stored in an array 
thirteenth i commented on all the code 
fourteenth i added a little bit more styling to the buttons
