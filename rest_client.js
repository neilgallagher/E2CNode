/**
 * Created with JetBrains WebStorm.
 * User: kitchen
 * Date: 29/07/13
 * Time: 23:24
 * To change this template use File | Settings | File Templates.
 */
var Client = require('node-rest-client').Client;

client = new Client();

var status = ["Working", "Communication Error", "Unknown Error"]
var start = Date.now();
var count = 0 ;

client.registerMethod("jsonMethod", "http://localhost:3000/systems", "POST");

function random (end)
{
    return Math.floor(Math.random() * (end+1)) + 0;
}

function getLogs()
{

}

function poll()
{
    var systemStatus =
        {
            report: {
                system: {
                    name: 'Windows 2000 System',
                    status: { level: 0, text: 'Working'}
                },
                application: [
                    {name: 'iSocketUI', version: '2.12b02?'},
                    {name: 'iSocket', version: '3.22b02?'},
                    {name: 'GC100', version: '1.01'},
                    {name: 'ReelControl', version: '1.15'}
                ],
                log: [
                    {event: Date.now(), message: 'USB:Micro:Enable:All '+ count}
                ],
                devices: {
                    device: [
                        {name: 'Micro', deviceType: {id: '1313FD10', name: 'GC100 Micro'}, status: {level: 1, text: status[random(2)]}},
                        {name: 'Reel Control', deviceType: {id: '000011110C14', name: 'IRD RGB Reel Drive'}, status: {level: 1, text: status[random(2)]}},
                        {name: 'Coin Hopper', deviceType: {id: '01DCDB', name: 'GC100 Micro'}, status: {level: 1, text: status[random(2)]}},
                        {name: 'Coin Hopper', deviceType: {id: '01D0DB', name: 'GC100 Micro'}, status: {level: 1, text: status[random(2)]}},
                        {name: 'Printer', deviceType: {id: 'WinPOS WP-K633', name: 'WinPOS WP-K633'}, status: {level: 3, text: status[random(2)]}}
                    ]
                }
            }
        } ;

    args_js ={
        //path:{"id":120},
        //parameters:{arg1:"hello",arg2:"world"},
        headers:{"test-header":"client-api", "content-type": "application/json;charset=utf-8"},
        data:systemStatus
    };

    client.methods.jsonMethod(args_js,function(data,response){
        // parsed response body as js object
        console.log(data + ' ' + count);
        // raw response
        //console.log(response);
    });
    if ( count < 1000 )
        setTimeout(poll, 1000);
    count++
}

poll() ;


