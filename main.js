
// $(function) {


// 	function commaSeparate (val) {
// 		while (/(\d+)(\d{3})/.test(val.toString())) {
// 			val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
// 		}

// 		return val;
// 	}

// 	function getData (area, show) {
// 		if(area == 'world') {
// 			url = '';
// 		}

// 		else {
// 			url = '/country/' + area;
// 		}

// 		$.ajax ({

// 		})
// 	}
// }


// Created by Dr.Hippo

$(function(){
    
    function commaSeparateNumber(val){
        while (/(\d+)(\d{3})/.test(val.toString())){
            val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
        }
        
        return val;
    }
    
    function getData(area,show){
        if(area == 'world'){
            url = '';
        }
        
        else{
            url = '/country/' + area;
        }
        
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/www.worldometers.info/coronavirus" + url,
            success: function(data){
                var TOTAL = data.split('<span style="color:#aaa">')[1].split('</span>')[0];
                var DEATHS = data.split('<div class="maincounter-number">\n<span>')[1].split('</span>')[0];
                
                if(area == 'world'){
                    RECOVERED = data.split('<div class="maincounter-number" style="color:#8ACA2B ">')[1].split('<span>')[1].split('</span>')[0];
                }
                
                else{
                    RECOVERED = data.split('<div class="maincounter-number" style="color:#8ACA2B ">\n<span>')[1].split('</span>')[0];
                }
                
                ACTIVE = commaSeparateNumber(TOTAL.split(',').join('') - DEATHS.split(',').join('') - RECOVERED.split(',').join(''));
                
                if(isNaN(TOTAL.split(',').join('') - DEATHS.split(',').join('') - RECOVERED.split(',').join(''))){
                    ACTIVE = 'N/A';
                }
                
                if(show === true){
                    $('#total.' + area).text('Total Cases: ' + TOTAL);
                    $('#active.' + area).text('Active Cases: ' + ACTIVE);
                    $('#deaths.' + area).text('Deaths: '  + DEATHS);
                    $('#recovered.' + area).text('Recoveries: ' + RECOVERED);
                }
                
                else{
                    alert('Country: ' + area + '\nCases: ' + TOTAL + '\nActive: ' + ACTIVE + '\nDeaths: ' + DEATHS + '\nRecoveries: ' + RECOVERED);
                    
                }
            },
            error: function(){
                alert("There was an error while loading " + area + ".");
            }
        });
    }
    
    $('#search').on('click',function(){
        var country = prompt('Please enter your country:');
        if(country !== null && country !== ''){
            getData(country.replace(' ','-'),false);
        }
    });
    
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/www.worldometers.info/coronavirus",
        success: function(data){
            var LAST_UPDATE = data.split('<div style="font-size:13px; color:#999; margin-top:5px; text-align:center">')[1].split('</div>')[0];
            
            $('#update_time').text(LAST_UPDATE);
        },
        error: function(){
            alert("There was an error while loading " + area + ".");
        }
    });
    
    getData('world',true);
    getData('us',true);
    getData('spain',true);
    getData('italy',true);
    getData('uk',true);
    getData('china',true);
});



