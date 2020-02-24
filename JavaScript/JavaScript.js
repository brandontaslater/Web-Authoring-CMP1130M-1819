// JavaScript Document

var data = {"total":0,"rows":[]};
		var totalCost = 0;
		
		$(function(){
			
			//grid
			$('#cartcontent').datagrid({
				singleSelect:true
			});
			
			if(localStorage && localStorage.getItem('cart')){
				// console log localStorage.getItem('cart') value, you will see a long json string
				// parse json from sttring into an array object
  			data='';//change this to 
  			
			console.log(data);
			$('#cartcontent').datagrid('loadData', data);
			$('div.cart .total').html('Total: £'+totalCost);
  			//localStorage.clear();

				}
			
			
			
			// items to drag
			$('.item').draggable({
				revert:true,
				proxy:'clone',
				onStartDrag:function(){
					$(this).draggable('proxy').css('z-index',10);
				}
				
			});
			
			//item to drop
			$('.cart').droppable({
				onDrop:function(e,source){
					var name = $(source).find('p.title').text();
					var price = $(source).find('p.title').attr("data");
					addProduct(name, parseFloat(price));
				}
			});
		});
		
		function addProduct(name,price){
			function add(){
				for(var i=0; i<data.total; i++){
					var row = data.rows[i];
					if (row.name == name){
						row.quantity += 1;
						return;
					}
				}
				data.total += 1;
				data.rows.push({
					name:name,
					quantity:1,
					price:price
				});
			}
			add();
			totalCost += price;
			$('#cartcontent').datagrid('loadData', data);
			$('div.cart .total').html('Total: £'+totalCost);
			
			// add to local storage
			//stringify js array object into json
		console.log( JSON.stringify(data) );
		
		//set or update local storage value
		
		}