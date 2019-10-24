var slideIndex = 0;
showSlides();

$.lang = {};
$.lang.en = {
	0: 'Welcome to Royal Caribbean\<br\>International',
	1: 'YOUTUBE',
	2: 'TODAY\'S EVENTS',
	3: 'REQUEST',
	4: 'ENTERTAINMENT',
	5: 'EXCURSIONS'
};

$.lang.sp = {
	0: 'Bienvenido a Royal Caribbean\<br\>International',
	1: 'YOUTUBE',
	2: 'EVENTO DE HOY',
	3: 'SOLICITUD',
	4: 'ENTRETENIMIENTO',
	5: 'EXCURSIONES'
}

$.lang.ch = {
	0: '欢迎来到皇家加勒比国际',
	1: 'YOUTUBE',
	2: '今天的事件',
	3: '请求',
	4: '娱乐',
	5: '游览'
}
console.log('test1');
function setLanguage(currentLanguage) {
	console.log('setLanguage : ' + currentLanguage);
	
	$('[data-langNum]').each(function () {
		var $this = $(this);
		$this.html($.lang[currentLanguage][$this.data('langnum')]);
	});
}
console.log('test2');
function clickLanguage(imgParam) {
	console.log(imgParam);
	var lang = imgParam.lang;
	console.log(lang);
	setLanguage(lang);
}
console.log('test3');
function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex> slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 10000); // Change image every 2 seconds
}	
console.log('test4');
function printClock() {
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    var clock = document.getElementById("time");            // 출력할 장소 선택
    var currentDate = new Date();                                     // 현재시간
    var calendar = currentDate.getFullYear() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getDate() // 현재 날짜
    var amPm = 'AM'; // 초기값 AM
    var currentHours = addZeros(currentDate.getHours(),2); 
    var currentMinute = addZeros(currentDate.getMinutes() ,2);
    var currentSeconds =  addZeros(currentDate.getSeconds(),2);
    
    if (currentHours >= 12) { // 시간이 12보다 클 때 PM으로 세팅, 12를 빼줌
    	amPm = 'PM';
    	currentHours = addZeros(currentHours - 12,2);
    }

    if (currentSeconds >= 50) {// 50초 이상일 때 색을 변환해 준다.
       currentSeconds = '<span style="color:#de1951;">'+currentSeconds+'</span>'
    }
    clock.innerHTML = currentHours + ":"+currentMinute + "<br>" + day[currentDate.getDay()] + ", " + currentDate.getDate() + " " + month[currentDate.getMonth()]; //날짜를 출력해 줌
    
    setTimeout("printClock()",1000);         // 1초마다 printClock() 함수 호출
}
console.log('test5');
function addZeros(num, digit) { // 자릿수 맞춰주기
	  var zero = '';
	  num = num.toString();
	  if (num.length < digit) {
	    for (i = 0; i < digit - num.length; i++) {
	      zero += '0';
	    }
	  }
	  return zero + num;
}
console.log('test6');

console.log('Start');
navigator.bluetooth.requestLEScan({
	filters: [{manufacturerData: {0x004C: {dataPrefix: new Uint8Array([
		0x02, 0x15 // iBeacon identifier.
	])}}}],
	keepRepeatedDevices: true
}).then(() => {
	navigator.bluetooth.addEventListener('advertisementreceived', event => {
		let appleData = event.manufacturerData.get(0x004C);
		console.log(appleData);
		if (appleData.byteLength != 23) {
			// Isn’t an iBeacon.
			return;
		}

	
		let major = appleData.getUint16(18, false);
		let minor = appleData.getUint16(20, false);
		console.log(major, minor);
		let txPowerAt1m = -appleData.getInt8(22);
		let pathLossVs1m = txPowerAt1m - event.rssi;    
	});	
});
console.log('test7');

