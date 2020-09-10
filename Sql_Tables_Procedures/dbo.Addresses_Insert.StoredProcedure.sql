USE [myDatabase]
GO
/****** Object:  StoredProcedure [dbo].[Addresses_Insert]    Script Date: 9/10/2020 12:05:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Addresses_Insert]
			@Id int OUTPUT,
			@LineOne nvarchar(50),
			@SuiteNumber nvarchar(50),
			@City nvarchar(50),
			@State nvarchar(50),
			@PostalCode nvarchar(50),
			@IsActive bit,
			@Lat float,
			@Long float
as

BEGIN




	INSERT INTO [dbo].[Addresses]
           ([LineOne]
           ,[SuiteNumber]
           ,[City]
           ,[State]
           ,[PostalCode]
           ,[IsActive]
           ,[Lat]
           ,[Long])
     VALUES
           (
		   @LineOne	
		   ,@SuiteNumber
		   ,@City		
		   ,@State		
		   ,@PostalCode	
		   ,@IsActive	
		   ,@Lat		
		   ,@Long	
		   )

	SET @Id = SCOPE_IDENTITY()





END


GO
