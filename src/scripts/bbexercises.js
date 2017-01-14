var jsdom = require('jsdom');
var fetch = require('node-fetch');
var fs = require('fs');

let data = [];
let promiseArray = [];

for (var i = 0; i < 1092; i = i + 15) {
    let body = "params=muscleID=13,3,18,5,17,4,15,6,9,7,1,12,2,11,14,10,8;exerciseTypeID=2,6,4,7,1,3,5;equipmentID=9,14,2,10,5,6,4,15,1,8,11,3,7;mechanicTypeID=1,2,11&orderByField=exerciseName&orderByDirection=ASC&page=" + i;
    promiseArray.push(fetch('http://www.bodybuilding.com/exercises/ajax/getfinderdata/', {
        method: 'POST', body: body, headers: {
            Cookie: "optimizelyEndUserId=oeu1484347218847r0.5961794548540993; m=7D84FB4B-2BDE-40AA-ACE9-A37837CB7C93; s_vnum=1486939219160%26vn%3D1; optimizelySegments=%7B%227530970880%22%3A%22none%22%2C%227539930257%22%3A%22search%22%2C%227507596475%22%3A%22true%22%2C%227542440059%22%3A%22safari%22%7D; optimizelyBuckets=%7B%228154950493%22%3A%228159370330%22%7D; s_cc=true; s_vi=[CS]v1|2C3CABA9851D4180-6000190DA00195D2[CE]; _ga=GA1.2.664234666.1484347219; s_ppv=78; s_fid=751CD6FBDA828422-02DDE1CCDA8DBCD5; s_nr=1484348405018; s_lv=1484348405018; s_lv_s=First%20Visit; s_prop_14=Visit; gpv_pn=exercises%3Aexercise%20finder; s_invisit=true; s_sq=bbprod%3D%2526pid%253Dexercises%25253Aexercise%252520finder%2526pidt%253D1%2526oid%253Djavascript%25253AupdateFinderPageNumber%252528150%252529%2526ot%253DA; v62=pagerDiv; v63=main; v66=%5B%5BB%5D%5D; v13=Optimizely_Merch_Flat_Rate_Free_Over_99_Spend%3A%20Original",
            Origin: "http://www.bodybuilding.com",
            'Accept-Encoding': "gzip, deflate",
            'Accept-Language': "en-US,en;q=0.8",
            'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
            'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8",
            Accept: "application/json, text/javascript, */*; q=0.01",
            Referer: "http://www.bodybuilding.com/exercises/finder/lookup/filter/muscle/id/1/muscle/chest",
            'X-Requested-With': "XMLHttpRequest",
            Connection: "keep-alive"
        }
    })
        .then(function (res) {
            return res.json();
        }).then(function (json) {
            jsdom.env(json.htmlCode.replace('\n', ''), ["http://code.jquery.com/jquery.js"],
                function (err, window) {
                    let exerciseNames = [];
                    let musclesTargeted = [];
                    let equipmentTypes = [];
                    window.$('.exerciseName h3 a').each(function () {
                        exerciseNames.push(this.text);
                    });

                    window.$('.exerciseName p span a').each(function () {
                        if (window.$(this).parent().parent().text().startsWith("Muscle"))
                            musclesTargeted.push(this.text);
                        else if (window.$(this).parent().parent().text().startsWith("Equipment"))
                            equipmentTypes.push(this.text);
                    });

                    exerciseNames.forEach((name, index) => {
                        data.push({ name: exerciseNames[index], muscle: musclesTargeted[index], equipment: equipmentTypes[index] })
                    });
                });
        }));
}

Promise.all(promiseArray).then(() => {
    console.log('done');
    let file = 'exercises.json';
    console.log(data);
    fs.writeFile(file, JSON.stringify(data, null, 2));
})