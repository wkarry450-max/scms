export default {
	app: {
		name: "scms",
		url: "http://localhost:8060",
		frontendUrl: "http://localhost:8050",
		secret: "fc51c9b6d513d085c06ab3c0935d8bec",
		language: "english",
		publicDir: "assets",
	},
	auth: {
		userTokenSecret: "aa94eb9A-1ax%W@845faYY6Q!!0-1f6e79bab709309f8088",
		apiTokenSecret: "572487d8$Xax%W!867c69B#Q-!0746a7a48a1686cc010553",
		jwtDuration: 30, //in minutes
		otpDuration: 5, //in minutes
	},
	database: {
		name:"scms",
		type: "mysql",
		host: "localhost",
		username: "root",
		password: "123456",
		port: "3306",
		charset: "utf8",
		recordlimit: 10,
		ordertype: "DESC"
	},
	mail: {
		username:"3646523603@qq.com",
		password: "jmuxvbqwozzedaaf",
		senderemail:"3646523603@qq.com",
		sendername:"ZFC",
		host: "smtp.qq.com",
		secure: true,
		port: "465"
	},
	upload: {
		tempDir: "uploads/temp/",
		importdata: {
			filenameType: "timestamp",
			extensions: "csv",
			limit: "10",
			maxFileSize: "3",
			returnFullpath: "false",
			filenamePrefix: "",
			uploadDir: "uploads/files/"
		},
		
		file_path: {
			filenameType: "random",
			extensions: "jpg,png,gif,jpeg",
			limit: "1",
			maxFileSize: "3",
			returnFullpath: false,
			filenamePrefix: "",
			uploadDir: "uploads/files",
			imageResize:  [ 
				{name: "small", width: 100, height: 100, mode: "cover"}, 
				{name: "medium", width: 480, height: 480, mode: "inside"}, 
				{name: "large", width: 1024, height: 760, mode: "inside"}
			],

		},

		photo: {
			filenameType: "random",
			extensions: "jpg,png,gif,jpeg",
			limit: "1",
			maxFileSize: "3",
			returnFullpath: false,
			filenamePrefix: "",
			uploadDir: "uploads/files",
			imageResize:  [ 
				{name: "small", width: 100, height: 100, mode: "cover"}, 
				{name: "medium", width: 480, height: 480, mode: "inside"}, 
				{name: "large", width: 1024, height: 760, mode: "inside"}
			],

		},

	},
	s3: {
		secretAccessKey: "",
		accessKeyId: "",
		region: "us-west-2",
		bucket: "",
	},
	
	locales: {
		'english': 'English',
	}

}