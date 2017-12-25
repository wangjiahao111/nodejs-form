//name=zs&age=12
function form(data){
    var arr = [];
    for(var i in data){
        arr.push(i + '=' + data[i]);
    }
    return arr.join('&');
}
function ajax(aja){
    //��ȡ����
    var json = aja || {};
    var url = json.url;
    if(!url){
        return;
    }
    var type = json.type || 'get';
    var data = json.data || {};
    //��������
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                json.success && json.success(JSON.parse(xhr.responseText));
            }else{
                json.success && json.success('error');
            }
        }
    };
    //�ж�ʹ��get/post����
    if(type.toUpperCase() === 'GET'){
        xhr.open(type,url + '?' + form(data),true);
        xhr.send(null);
    }else if(type.toUpperCase() === 'POST'){
        xhr.open(type,url,true);
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(form(data));
    }
}