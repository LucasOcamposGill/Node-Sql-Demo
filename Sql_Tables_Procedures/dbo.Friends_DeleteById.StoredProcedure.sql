USE [myDatabase]
GO
/****** Object:  StoredProcedure [dbo].[Friends_DeleteById]    Script Date: 9/10/2020 12:05:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Friends_DeleteById]
			@Id int

/*

	declare @Id int = 10
	Execute [dbo].[Friends_DeleteById]
				@Id

*/

as
BEGIN
		DELETE
		FROM [dbo].[Friends]
		WHERE Id = @Id

END
GO
