var fetchArray = function( result ){
	let metaData = result.metaData;
	let rows = result.rows;
	let resRow = [];

	rows.forEach(function(row, i) {
	    var line = {};
	    row.forEach(function(item, x) {
	        line[ metaData[x].name ] = item;
	    });
	    resRow.push( line );
	});

	return resRow;
}

function getFecha(){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1;
		var yyyy = today.getFullYear();

		var horaActual = today.getTime();

		if(dd<10) {
				dd = '0'+dd
		}

		if(mm<10) {
				mm = '0'+mm
		}

		return yyyy + '' + mm + '' + dd + '' + horaActual;
}

function numero(num){
		numtmp='"'+num+'"';
		largo=numtmp.length-2;
		numtmp=numtmp.split('"').join('');
		if(largo==5)return numtmp;
		ceros='';
		pendientes=5-largo;
		for(i=0;i<pendientes;i++)ceros+='0';
		return ceros+numtmp;
}


module.exports ={
	fetchArray,
	numero,
	getFecha
}
