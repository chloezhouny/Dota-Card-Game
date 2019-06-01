

			var imgArr = ["assets/images/sf.gif", "assets/images/pheonix.gif", "assets/images/windrunner.gif", "assets/images/enigma.gif"];
			var miniImgArr = ["assets/images/mini0.png", "assets/images/mini1.png", "assets/images/mini2.png", "assets/images/mini3.png" ]
			var charIdArr = ["c0", "c1", "c2","c3"];
			var pointIdArr = ["p0", "p1", "p2", "p3"];

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


		function startGame()
		{
			myCharacterPicked = 0;
			defender = "";
			defeatedCount = 0;
			defenderPicked = 0;

			c0 = 
			{
				name: "Shadow Fiend",
				healthPoint: 200,
				attackPower: 19,
				counterPower: 20,
				defeatedStatus: false,
				id: "#c0",
				pointId: "#p0"
			}

			c1 = 
			{
				name: "Phoenix",
				healthPoint: 200,
				attackPower: 21,
				counterPower: 12,
				defeatedStatus: false,
				id: "#c1",
				pointId: "#p1"
			}

			c2 = 
			{
				name: "Windranger",
				healthPoint: 200,
				attackPower: 18,
				counterPower: 17,
				defeatedStatus: false,
				id: "#c2",
				pointId: "#p2"
			}

			c3 = 
			{
				name: "Enigma",
				healthPoint: 200,
				attackPower: 21,
				counterPower: 14,
				defeatedStatus: false,
				id: "#c3",
				pointId: "#p3"
			}


			characterArr = [c0, c1, c2, c3];

/* Add character buttons */
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
				
				
				var attackPower = $("<div id='attackPower'></div>");
				pointSpan.append(attackPower);
				attackPower.html("<br> <div> ⚔️" + characterArr[i].attackPower + "<div>");
				

				var healthPoint = $("<div class = 'healthPoint' id=" + pointIdArr + "></div>");
				pointSpan.append(healthPoint);
				healthPoint.html("<div> ♥" + characterArr[i].healthPoint + "<div>");
								
			}

			$(".character").on("click", function()
			{
				console.log(myCharacterPicked);
				if (myCharacterPicked === 0)
				{
					myCharacter = parseInt($(this).val());
					$("#myCharacterArea").append($(this));
					for (var i = 0; i < characterArr.length; i ++)
					{
						if (i !== myCharacter) {
							$("#enemiesArea").append($(characterArr[i].id));
						}
					}
					myCharacterPicked = 1;
				}

				else if (parseInt($(this).val())!== myCharacter && defenderPicked === 0)
				{

					defender = parseInt($(this).val());
					$("#defenderArea").html($(this));
					$(this).attr("width", "400px")
					defenderPicked ++;
				}
			})
		}
		

		startGame();
		$("#enemiesDiv").hide();
		$("#fightSection").hide();
		/*$(".score").hide();-->*/

		$("#restart").on("click", function()
		{
			$("#myCharacterArea").empty();
			$("#resultArea").empty();
			$("#selectArea").empty();
			$("#enemiesArea").empty();
			console.log($("#myCharacterArea"));
			startGame();
		})


		$("#attack").on("click", function()
		{
			if(characterArr[defender].defeatedStatus === true && defeatedCount < 3)
			{
				$("#resultArea").html("No enemy to attack");
			}
			if(characterArr[defender].healthPoint > 0 && characterArr[myCharacter].healthPoint > 0)
			{
				$("#resultArea").html("");
				characterArr[myCharacter].healthPoint -= characterArr[defender].counterPower;
				characterArr[defender].healthPoint -= characterArr[myCharacter].attackPower;
				

				$(characterArr[myCharacter].pointId).html("<br>" + characterArr[myCharacter].healthPoint);
				$(characterArr[defender].pointId).html("<br>" + characterArr[defender].healthPoint);


				if(characterArr[defender].healthPoint > 0 && characterArr[myCharacter].healthPoint > 0)
				{
					$("#resultArea").append("<h3> You attacked " + characterArr[defender].name + " for " + characterArr[myCharacter].attackPower + " damage. <br>");
					$("#resultArea").append(characterArr[defender].name + " attacked you back for " + characterArr[defender].counterPower+ " damage. ")
				}


				if(characterArr[defender].healthPoint < 0 && defeatedCount < 3)
				{
					$("#resultArea").append("<h3> You have defeated " + characterArr[defender].name + ", you can choose to fight another enemy");
					$("#defenderArea").html("");
					characterArr[defender].defeatedStatus = true;
					defeatedCount ++;
					defenderPicked = 0;
					if(defeatedCount >= 3)
					{
						$("#resultArea").html("Your won! !! Game over!!");
					}
				}

				characterArr[myCharacter].attackPower += characterArr[myCharacter].attackPower;
			}
		})

	