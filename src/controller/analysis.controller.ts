import * as webpage from 'webpage';
declare const phantom;


class TagController {


    screenPrint(req, res, next) {
        const siteUrl = req.body.url;
        var page = webpage.create();
        page.open('https://dknfeiov.github.io/', function (status) {
            console.log(siteUrl, "Status: " + status);
            if (status === "success") {
                page.render('example.png');
            }
            phantom.exit();
            res.send({
                status: 100,
                msg: '生成截图成功！'
            })
        });

    }

}


export default new TagController();