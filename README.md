
# Node-Sql-Demo

Simple ExpressJS API connected to a SQL database
It has Bcrypt and SendGrid intergrated in a very basic form 

You will have to add the right information in the .env file to be able to connect to your database, right now its filled with dummy data.

All the tables and procs you need for your database are in the Sql_Tables_Procedures folder and can be used with Microsoft SQL Server Management Studio 18.

You will also need to aquire an API key for SENDGRID and add that to the .env file as well, if you want to run it without SENDGRID you can comment out the sections where they are used. that would be the insert and update user calls in the controller folder and in the .env folder

after that is done, you should be able to run the app. the README.md folder in the myAPP has all the current endpoints.


