function setMenu()
{
	let path = window.location.pathname;
	let index = path.split("/").pop();
	
	let str = "";
	let code = CentralLabCode();
	str +="<div class=\"sidebar-heading\">Last update : 21/08/2023</div>";
	if(index == "index.html" || path == "/")
		str +="<li class=\"nav-item active\">";
	else
		str +="<li class=\"nav-item\">";
	str +="<a class=\"nav-link\" href=\"index.html\">";
	str +="<i class=\"fas fa-fw fa-calculator\"></i>";
	str +="<span>Simulator<br></span></a>";
	str +="</li>";
	if(index == "expscaler.html")
		str +="<li class=\"nav-item active\">";
	else
		str +="<li class=\"nav-item\">";
	str +="<a class=\"nav-link\" href=\"expscaler.html\">";
	str +="<i class=\"fas fa-fw fa-chart-area\"></i>";
	str +="<span>EXP Scaler</span></a>";
	str +="</li>";
	if(index == "refine.html")
		str +="<li class=\"nav-item active\">";
	else
		str +="<li class=\"nav-item\">";
	str +="<a class=\"nav-link\" href=\"refine.html\">";
	str +="<i class=\"fas fa-fw fa-hammer\"></i>";
	str +="<span>Refine<br></span></a>";
	str +="</li>";
	if(index == "news.html")
		str +="<li class=\"nav-item active\">";
	else
		str +="<li class=\"nav-item\">";
	str +="<a class=\"nav-link\" href=\"news.html\">";
	str +="<i class=\"fas fa-fw fa-wrench\"></i>";
	str +="<span>Patch Notes<br></span></a>";
	str +="</li>";
	str +="<li class=\"nav-item\">";
	str +="<a class=\"nav-link\">";
	str +="<i class=\"fas fa-fw fa-calendar-days\"></i>";
	str +="<span>Central Lab Code: " + code[8];
	str +="<table style=\"border:solid;\">";
	str +="<tr>";
	str +="<td style=\"text-align:center;background-color: red;\">";
	str +="S1";
	str +="</td>";
	str +="<td style=\"text-align:center;background-color: orange;\">";
	str +="S2";
	str +="</td>";
	str +="<td style=\"text-align:center;background-color: yellow;\">";
	str +="S3";
	str +="</td>";
	str +="<td style=\"text-align:center;background-color: cyan;\">";
	str +="S4";
	str +="</td>";
	str +="<td style=\"text-align:center;color: white;background-color: blue;\">";
	str +="S5";
	str +="</td>";
	str +="<td style=\"text-align:center;background-color: green;\">";
	str +="S6";
	str +="</td>";
	str +="<td style=\"text-align:center;background-color: yellow;\">";
	str +="S7";
	str +="</td>";
	str +="<td style=\"text-align:center;background-color: cyan;\">";
	str +="S8";
	str +="</td>";
	str +="</tr>";
	str +="<tr>";
	str +="<td>";
	if(code[0])
		str +="ON";
	else
		str +="-";
	str +="</td>";
	str +="<td>";
	if(code[1])
		str +="ON";
	else
		str +="-";
	str +="</td>";
	str +="<td>";
	if(code[2])
		str +="ON";
	else
		str +="-";
	str +="</td>";
	str +="<td>";
	if(code[3])
		str +="ON";
	else
		str +="-";
	str +="</td>";
	str +="<td>";
	if(code[4])
		str +="ON";
	else
		str +="-";
	str +="</td>";
	str +="<td>";
	if(code[5])
		str +="ON";
	else
		str +="-";
	str +="</td>";
	str +="<td>";
	if(code[6])
		str +="ON";
	else
		str +="-";
	str +="</td>";
	str +="<td>";
	if(code[7])
		str +="ON";
	else
		str +="-";
	str +="</td>";
	str +="</tr>";
	str +="</table>";
	str +="</span>";
	str +="</a>";
	str +="</li>";
	
	
	str +="<!-- Divider -->";
	str +="<hr class=\"sidebar-divider\">";

	str +="<!-- Heading -->";
	str +="<div class=\"sidebar-heading\">";
	str +="Others";
	str +="</div>";

	if(index == "contact.html")
		str +="<li class=\"nav-item active\">";
	else
		str +="<li class=\"nav-item\">";
	str +="<a class=\"nav-link\" href=\"contact.html\">";
	str +="<i class=\"fas fa-fw fa-envelope\"></i>";
	str +="<span>Contact</span></a>";
	str +="</li>";

	str +="<li class=\"nav-item\">";
	str +="<a class=\"nav-link\" href=\"https://github.com/Kordasauter/roprime-simulator.com\">";
	str +="<i class=\"fa-brands fa-github\"></i>";
	str +="<span>GitHub</span></a>";
	str +="</li>";

	str +="<li class=\"nav-item\">";
	str +="<a class=\"nav-link\" href=\"https://streamlabs.com/kord_en_live/tip\">";
	str +="<i class=\"fa-brands fa-paypal\"></i>";
	str +="<span>Donate</span></a>";
	str +="</li>";

	if(index == "about.html")
		str +="<li class=\"nav-item active\">";
	else
		str +="<li class=\"nav-item\">";
	str +="<a class=\"nav-link\" href=\"about.html\">";
	str +="<i class=\"fas fa-fw fa-question\"></i>";
	str +="<span>About</span></a>";
	str +="</li>";
	
	document.getElementById("menu").innerHTML = str;
}

setMenu();

function CentralLabCode()
{
	let bincode = [false,false,false,false,false,false,false,false,0];
	let offset = 2; //gtm + 2
	// create Date object for current location
	let d = new Date();
	// convert to msec
	// subtract local time zone offset
	// get UTC time in msec
	let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
	// create new Date object for different city
	// using supplied offset
	var nd = new Date(utc + (3600000*offset));
	<!-- d = d.getTime() + (d.getTimezoneOffset()); -->
	let code = ((nd.getMonth() + 1) + (nd.getDate())) * 5
	bincode[8] = code;
	for(let i = 7; i >= 0; i--)
	{
		let num = Math.pow(2,i);
		if(code >= num)
		{
			bincode[7-i] = true;
			code -= num;
		}
	}
	return bincode;
}