

	var imgArr = ["assets/images/sf.gif", "assets/images/pheonix.gif", "assets/images/windrunner.gif", "assets/images/enigma.gif"];
	var miniImgArr = ["assets/images/mini0.png", "assets/images/mini1.png", "assets/images/mini2.png", "assets/images/mini3.png" ];
	var borderColor = ["0 0 40px rgba(209, 87, 62, 1)", "0 0 40px rgba(245, 205, 117, 1)", "0 0 40px rgba(102, 187, 6, 1)", "0 0 40px rgba(137, 82, 255, 1)"];
	var attackImgArr = ["url('assets/images/attack.png')", "url('assets/images/magic.png')", "url('assets/images/wind.png')","url('assets/images/magic.png')"];
	var border = ["red", "yellow"];
	var charIdArr = ["c0", "c1", "c2","c3"];
	var pointIdArr = ["p0", "p1", "p2", "p3"];
	var attackIdArr = ["a0", "a1", "a2", "a3"];

	var myCharacter;
	var myCharacterScore;
	var myCharacterPicked;
	var defender;
	var defeatedCount;
	var defenderPicked;

	var c0;
	var c1;
	var c2;
	var c3;
	var characterArr; 


/* Initial Status & Restart Settings */

	function startGame()
	{
		/* Create Heroes Objects */
		myCharacterPicked = 0;
		defender = "";
		defeatedCount = 0;
		defenderPicked = 0;

		c0 = 
		{
			name: "Shadow Fiend",
			healthPoint: 130,
			attackPower: 30,
			attackBase: 30,
			counterPower: 20,
			defeatedStatus: false,
			id: "#c0",
			pointId: "#p0",
			attackId: "#a0"
		}

		c1 = 
		{
			name: "Phoenix",
			healthPoint: 200,
			attackPower: 20,
			attackBase: 20,
			counterPower: 35,
			defeatedStatus: false,
			id: "#c1",
			pointId: "#p1",
			attackId: "#a1",
		}

		c2 = 
		{
			name: "Windranger",
			healthPoint: 180,
			attackPower: 24,
			attackBase: 24,
			counterPower: 24,
			defeatedStatus: false,
			id: "#c2",
			pointId: "#p2",
			attackId: "#a2",
		}

		c3 = 
		{
			name: "Enigma",
			healthPoint: 300,
			attackPower: 15,
			attackBase: 15,
			counterPower: 14,
			defeatedStatus: false,
			id: "#c3",
			pointId: "#p3",
			attackId: "#a3",
		}


		characterArr = [c0, c1, c2, c3];

		/* Append Heroes on HTML */
		for (var i = 0; i < characterArr.length; i++)
		{
			var characterBtn = $("<div id=" + charIdArr[i] +"></div>");
			$("#selectArea").append(characterBtn);
			characterBtn.addClass("character");
			characterBtn.val(i);

			
			var name = $("<div id='name'></div>");
			characterBtn.append(name);
			name.html("<img id = 'miniImg' src=" + miniImgArr[i] + ">" + characterArr[i].name);


			var image = $("<img id='image' src=" + imgArr[i] + ">");
			characterBtn.append(image);
			
			var pointSpan = $("<div id='pointSpan'></div>");
			characterBtn.append(pointSpan);
			pointSpan.addClass('point');
			
			
			var attackPower = $("<div class='attackPower' id=" + attackIdArr[i] +"></div>");
			pointSpan.append(attackPower);
			attackPower.html("<br> <div> ⚔️" + characterArr[i].attackPower + "<div>");
			

			var healthPoint = $("<div class = 'healthPoint' id=" + pointIdArr[i] + "></div>");
			pointSpan.append(healthPoint);
			healthPoint.html("<div> ♥" + characterArr[i].healthPoint + "<div>");
							
		}

		/* On Click Event Listener for Hero Selection */
		$(".character").on("click", function()
		{

			
			if (myCharacterPicked === 0)
			{
				$("#selectArea").hide();
				$("#selectArea").css("padding-top", "0px")

				$("#enemiesDiv").show();
				$("#enemiesDiv").css("margin-left", "370px");
				$("#enemiesDiv").css("margin-bottom", "300px");
				$("#myCharacterDiv").show();
				myCharacter = parseInt($(this).val());

				$("#myCharacterDiv").append($(this));
				$(this).css("box-shadow", borderColor[myCharacter]);
				$("#attack").css("background-image", attackImgArr[myCharacter]);
				$("#attack").hide();

				for (var i = 0; i < characterArr.length; i ++)
				{
					if (i !== myCharacter) {
						$(characterArr[i].id).addClass('enemies');
						$("#enemiesDiv").append($(characterArr[i].id));
					}
					else
					{
						$(this).css('margin', '0');
					}
				}
				myCharacterPicked = 1;
				$("#resultDiv").html("Now choose your first enemy.");		

			}

			else if (parseInt($(this).val())!== myCharacter && defenderPicked === 0)
			{

				defender = parseInt($(this).val());
				if(defeatedCount === 0)
				{
					$("#enemiesDiv").css("margin-left", "55px");
				}
				$(this).css("box-shadow", borderColor[defender]);
				$(this).css('margin', '0');
				$("#defenderDiv").show();
				$("#defenderDiv").css("top", "10px");
				$("#defenderDiv").html($(this));
				$("#attack").css("top", "-200px");
				$("#resultDiv").html("Press button on the right to start your battle.");		

				$(this).attr("width", "400px");
				defenderPicked ++;
				$("#myCharacterDiv").css("top", "120px");

			}
		})
	}
	






/* Hero Selection Scene */
$("#attack").hide();
	$("#start").show();
	startGame();
	console.log($("#myCharcterDiv"));
	$("#enemiesDiv").hide();
	$("#myCharacterDiv").hide();
	$("#defenderDiv").hide();
	$("#attack").hide();
	$("#restart").hide();




/* Start Battle Event Listener */
	$("#start").on("click", function()
	{
		if(defenderPicked === 1)
		{
			$("#enemiesDiv").css("right", "700px");	
			$("#enemiesDiv").show();
			$("#resultDiv").html("Attack your enemy.");					
			$("#attack").show();
			$("body").css("background-image", "url('assets/images/bg3.jpg')");
			$("body").css("background-size", "100% auto");
			$("#start").hide();
			$("#attack").show();

		}
	})


/* On Click Event Listener for Battle Attack */

	$("#attack").on("click", function()
	{
		if(characterArr[defender].defeatedStatus === true && defeatedCount < 3)
		{
			$("#resultDiv").html("<h3> No enemy to attack </h3>");
		}
		if(characterArr[defender].healthPoint > 0 && characterArr[myCharacter].healthPoint > 0)
		{
			$("#resultDiv").html("");
			characterArr[myCharacter].healthPoint -= characterArr[defender].counterPower;
			characterArr[defender].healthPoint -= characterArr[myCharacter].attackPower;

			if(characterArr[defender].healthPoint > 0 && characterArr[myCharacter].healthPoint > 0)
			{
				$("#resultDiv").html("<h3> You attacked " + characterArr[defender].name + " for " + characterArr[myCharacter].attackPower + " damage. <br>");
				$("#resultDiv").append(characterArr[defender].name + " attacked you back for " + characterArr[defender].counterPower+ " damage. ")
			}


			if(characterArr[defender].healthPoint <= 0 && defeatedCount < 3)
			{
				$("#resultDiv").html("<h3> You have defeated " + characterArr[defender].name + "! <br>");
				$("#resultDiv").append("Choose to fight another enemy.")
				$("#enemiesDiv").show();
				$("#defenderDiv").html("");
				$("#defenderDiv").hide();
				$("#attack").css("top", "130px");
				$("#myCharacterDiv").css("top", "450px")
				characterArr[defender].defeatedStatus = true;
				defeatedCount ++;
				defenderPicked = 0;
				if(defeatedCount >= 3)
				{
					$("#resultDiv").html("<h3> Your won! !! Game over!! </h3>");
					$("#attack").hide();
					$("#restart").show();

				}
			}

			if(characterArr[myCharacter].healthPoint < 0)
			{
				$("#resultDiv").html("<h3> Your lose! !! Game over!! </h3>");
				$("#attack").hide();
				$("#restart").show();
			}

			characterArr[myCharacter].attackPower += characterArr[myCharacter].attackBase;
			$(characterArr[myCharacter].attackId).html("<br> <div>⚔️" + characterArr[myCharacter].attackPower + "<div>");

			$(characterArr[myCharacter].pointId).html("<div> ♥" + characterArr[myCharacter].healthPoint + "<div>");
			$(characterArr[defender].pointId).html("<div> ♥" + characterArr[defender].healthPoint + "<div>");
		}
	})

/* On Click Event Listener for Restart Game */

	$("#restart").on("click", function()
	{
		$("#myCharacterDiv").empty();
		$("#defenderDiv").empty();
		$("#resultDiv").empty();
		$("#selectArea").empty();
		$("#enemiesDiv").empty();
		$("#attack").empty();
		$("#restart").hide();
		$("body").css("background-image", "url('assets/images/bg.jpg')");
		$("body").css("background-size", "112% auto");
		console.log($("#myCharacterDiv"));
		$("#start").show();
		startGame();
		$("#enemiesDiv").hide();
		$("#myCharacterDiv").hide();
		$("#defenderDiv").hide();
		$("#attack").hide();
		$("#restart").hide();


	})

