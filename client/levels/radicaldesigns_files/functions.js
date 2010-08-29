//Javascript function to select all/deselect all on a given page
var sel_action='Select All';
function list_selectAll( form_name, id_element_name ) {
    if ( !id_element_name ) id_element_name = 'list_action_id';
    sform=document.forms[ form_name ]; 
    t=document.forms[ form_name ].length;
    if (sel_action=='Select All') {
        sel_action='Unselect All';
        var tvalue=true;
    } else {
        sel_action='Select All';
        var tvalue=false;
    }
    for (n=0; n<t; n++){
        //alert(sform.elements[n].name);
        if (sform.elements[n].name.substring(0, id_element_name.length )== id_element_name ) {
            sform.elements[n].checked=tvalue;
        }
    }
}

//Javascript - selects an ID - used by table row_select
function select_id(find_id, form_name, id_element_name ) {
    if ( !id_element_name ) id_element_name = 'list_action_id';
    sform=document.forms[ form_name ];
    t = sform.length;
    for (n=0; n<t; n++){
        //alert(sform.elements[n].name);
        if (sform.elements[n].name.substring(0, id_element_name.length )== id_element_name && sform.elements[n].value==find_id) {
            sform.elements[n].checked=!sform.elements[n].checked;
            return;
        }
    }
}

function EmailToFriend(URL) { 
day = new Date();  id = day.getTime(); 
var url = url + "?url=" + escape(document.location)
//document.location
//URL = URL + "?page=" + window.location.href;
eval("url" + id + " = window.open(URL, '" + id + "', 'toolbar=1,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=500,height=320');"); 
}


function popUp(URL) {
day = new Date();
id = day.getTime();
eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=1,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=750,height=500');");
}

function openform(url) {
var url = url + "?url=" + escape(document.location)
	//var NS = (document.layers) ? true : false;
	//var IE = (document.all) ? true : false;

//if(NS) {
	window.open(url,"","scrollbars=yes,menubar=no,personalbar=no,width=500,height=520,screenX=220,screenY=0");
//} else if(IE) {
//	window.open(url,"","scrollbars=no,menubar=no,personalbar=no,width=500,height=290,left=220,top=0");
//}

}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_validateForm() { //v4.0
  var i,p,q,nm,test,num,min,max,errors='',args=MM_validateForm.arguments;
  for (i=0; i<(args.length-2); i+=3) { test=args[i+2]; val=MM_findObj(args[i]);
    if (val) { nm=val.name; if ((val=val.value)!="") {
      if (test.indexOf('isEmail')!=-1) { p=val.indexOf('@');
        if (p<1 || p==(val.length-1)) errors+='- '+nm+' must contain an e-mail address.\n';
      } else if (test!='R') { num = parseFloat(val);
        if (isNaN(val)) errors+='- '+nm+' must contain a number.\n';
        if (test.indexOf('inRange') != -1) { p=test.indexOf(':');
          min=test.substring(8,p); max=test.substring(p+1);
          if (num<min || max<num) errors+='- '+nm+' must contain a number between '+min+' and '+max+'.\n';
    } } } else if (test.charAt(0) == 'R') errors += '- '+nm+' is required.\n'; }
  } if (errors) alert('The following error(s) occurred:\n'+errors);
  document.MM_returnValue = (errors == '');
}

function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}


function confirmSubmit(text) { 
  var yes = confirm(text); 
  if (yes) return true; 
  else return false; 
} 

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function AMP_swapLoadImage( imgsrc, elementid ) {
    target_image = document.getElementById( elementid );
    if ( !target_image ) return false;
    target_image.src = 'http://' + window.location.host + "/" + imgsrc;
    target_image.style.display="block";
}

function AMP_swapLinkTarget( target_url, elementid ) {
    target_element = document.getElementById(  elementid );
    if ( !target_element ) return false;
    target_element.href = target_url;
}

function AMP_showValid( item_value, elementid ) {
    target_element = document.getElementById(  elementid );
    if ( !target_element ) return false;
	if (item_value) target_element.style.display = "block";
	else target_element.style.display = "none";
	
}

function AMP_openURL( target_url_here ) {
	parent.location = target_url_here;
}

function showPopup( url, width, height ) {
    if ( !width ) width = 300;
    if ( !height ) height = 250;
    hWnd = window.open ( url, 'recordWindow_'+new Date().getTime(), 'height='+height+',width='+width+',scrollbars=no,menubar=no,toolbar=no,resizeable=no,location=no,status=no' );

}

function showUploadWindow (parentform, calledfield, dtype, handler) {
    alert( 'Sorry, this upload mechanism has been disabled for security reasons');
    //url  = 'http://'+location.host+'/upload_popup.php?pform='+parentform+'&pfield='+calledfield;
    //if (dtype) url = url + '&doctype='+dtype;
    //if (handler) url = url + '&handler='+handler;
    //hWnd = window.open( url, 'recordWindow', 'height=175,width=300,scrollbars=no,menubar=no,toolbar=no,resizeable=no,location=no,status=no' );
}

function AMP_load_proto( ) {
    if ( self.Ajax ) return true;
    if( document.createElement && document.childNodes ) {
        var scriptElem = document.createElement('script');
        scriptElem.setAttribute('src','/scripts/ajax/prototype.js');
        scriptElem.setAttribute('type','text/javascript');
        document.getElementsByTagName('head')[0].appendChild(scriptElem);
    }
    return false;

}

function load_proto( ) {
    if ( self.Ajax ) return true;
    if( document.createElement && document.childNodes ) {
        var scriptElem = document.createElement('script');
        scriptElem.setAttribute('src','/scripts/ajax/prototype.js');
        scriptElem.setAttribute('type','text/javascript');
        document.getElementsByTagName('head')[0].appendChild(scriptElem);
    }
    return false;

}

