const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const type = {
    '.html':'text/html;charset=utf-8',
    '.js':'text/javascript',
    '.css':'text/style'
};

http.createServer((request,response) => {
    if(request.url == '/favicon.ico'){
        return;
    }
    //ת�ַ�������ȡ��׺��
    const obj = url.parse(request.url,true);
    const pathname = obj.pathname;
    const query = obj.query;
    const ext = path.extname(pathname);
    //�ж��ļ�����
    if(ext){
        response.writeHead(200,{
            'Content-Type':type[ext] || 'text/plain'
        });
        try{
            response.write(fs.readFileSync(path.join(__dirname,'www',request.url)));
        }catch(e){
            response.write('error');
        }
        response.end();
    }else{
        if(request.method == 'GET'){
            button(query,response);
        }else{
            let arr = [];
            request.on('data',chunk => {
                str.push(chunk);
            });
            request.on('end',() => {
                const buffer = Buffer.concat(str).toString();
                let post = querystring.parse(buffer);
                button(post,response);
            })
        }
    }
}).listen(8080);

const button = (query,response) => {
    switch (query.action){
        case 'register':
            if(obj[query.name]){
                response.write('{"code":1,"alt":"���û����Ѿ����ڣ�������ע��!"}');
            }else{
                response.write('{"code":0,"alt":"ע��ɹ�!"}');
                obj[query.name] = query.pwd.split('?')[0];
            }
            break;
        case 'login':
            if(!obj[query.name]){
                response.write('{"code":1,"alt":"���û�������!"}');
            }else if(obj[query.name] !== query.pwd){
                response.write('{"code":2,"alt":"�����û������������!"}');
                obj[query.name] = query.pwd.split('?')[0];
            }else{
                response.write('{"code":0,"alt":"��¼�ɹ�!"}');
            }
            break;
        default:
            response.write('ok')
    }
    response.end();
}


















