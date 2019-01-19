var hostIP;

$(function() 
{
	getLocalIP();
});

function getLocalIP()
{
	window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;//compatibility for Firefox and chrome
	var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};      
	pc.createDataChannel('');//create a bogus data channel
	pc.createOffer(pc.setLocalDescription.bind(pc), noop);// create offer and set local description
	pc.onicecandidate = function(ice)
	{
	 if (ice && ice.candidate && ice.candidate.candidate)
	 {
	 	var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
	    		
		 updateThisIPAdress(myIP);

	 	pc.onicecandidate = noop;
	 }
	};
}

function updateThisIPAdress(ip)
{
	console.log(ip);
	hostIP = ip;
	$("#this-ip-address").text("this ip address : "+ip);
}

function connectToHost()
{
	// Create WebSocket connection.
	const socket = new WebSocket("ws://"+hostIP+":8080");

	// Connection opened
	socket.addEventListener('open', function (event) {
		socket.send('Hello Server!');
	});

	// Listen for messages
	socket.addEventListener('message', function (event) {
		console.log('Message from server ', event.data);
	});
}

function sendMessage()
{
	
}