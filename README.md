# DataAnalysis
Sample data analysis application created with MAN (Mangodb, Angular and Node).



Delplyment and Running Envirentment Request:

(1) Get the application source codes.

    a) Download from the github website, or
    b) run git command:  git clone https://github.com/kevinchen278/DataAnalysis.git

(2) Deployment

       a) Go to the project folder, run command: npm install
       b) run the node server command, run command: node server
       c) open your browser, open the url:  http://localhost:8080
       d) or before step b, run command "gulp build" to generate the release version UI, then run the node server with npm start.

(3) Deployed on the Openshift.

     The application has been deployed on the openshift with the link: http://dataanalysis-kevinchen278.rhcloud.com/#/
   
(4) About the source codes.

    Database: mongodb. version 3.x
    Database Driver: mongodb native driver, 2.x
    Database Data: sample data store on the mlab.com
    
    Application Structure: 
       Server:  ----------------------------------------- based on nodejs and express framework.
          Appliation Folder -/server.js                   --- server entery.
                            -/db/conn.js                  --- Provided the webservice and Database connection.
                            -/db/DBProvider.js            ----Provided the interface for Database and webservice.
                            -/WebService/webservice.js   --- included web service interface, exposed to the UI.
        UI/Front End: ----------------------------------- based on Angularjs 1.x, jquery, bootstrap, LESS.
           application Folder  --/public----------------- All the UI in this folder.
                                     |
                                     /common/Directives  ---  Angular components.
                                                |   
                                                /MyDropdown.js ----  custom directive, my-dropdown.
                                    /common/Services     ----  Angular Services.
                                               |
                                               /dataservice.js -----  the interface for UI and webservice.
                                    /css
                                       |
                                       style.less, style.css  ------  style files with LESS.
                                    |
                                    main.js     ----------------------  UI router js, based on UI-router.
                                    index.html  ---------------------- UI main page.
                                    |
                                    /modules/  ------------------------ functionalities modules.
                                           |
                                           layout  --------------------- for UI layout.
                                             |
                                             ....
                                            /claims
                                               controllers, views, models, service.    ....
                                            /hail
                                               controllers, views, models, service.    ....
                                            /Charts
                                                |
                                                DrawCharts.js       ------ provided all the drawing charts factory.
                                                

       
       
         
    
    
   
   



    
