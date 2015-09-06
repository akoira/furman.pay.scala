function generateDateData() {
    var data = [];
    var start = moment().add(-1, "year").startOf('day').locale("ru");
    var end = moment().add(1, "day").startOf('day').locale("ru");

    while (start < end) {
        data.push(
            {
                "year": start.year(),
                "month": {
                    "number": start.month(),
                    "name": start.format("MMMM"),
                },
                "day": start.date()
            }
        );
        start.add(1, "day");
    }
    return data;
}


function generateOrdersData() {
    var data = [];
    for (var i = 0; i < 100; i++) {
        data.push(
            {
                "id": Math.floor((Math.random() * 1000) + 1),
                "order": {
                    "id": Math.floor((Math.random() * 1000) + 1),
                    "number": Math.floor((Math.random() * 10) + 1) + "-" + Math.floor((Math.random() * 1000) + 1),
                    "name": "Order " + Math.floor((Math.random() * 10) + 1) + "-" + Math.floor((Math.random() * 1000) + 1),
                },
                "cutting": {
                    "id": Math.floor((Math.random() * 1000) + 1),
                    "value": Math.floor(Math.random() * 1000 + 1) / 100
                },
                "directGlueing": {
                    "id": Math.floor((Math.random() * 1000) + 1),
                    "value": Math.floor(Math.random() * 1000 + 1) / 100
                },
                "curveGlueing": {
                    "id": Math.floor((Math.random() * 1000) + 1),
                    "value": Math.floor(Math.random() * 1000 + 1) / 100
                },
                "milling": {
                    "id": Math.floor((Math.random() * 1000) + 1),
                    "value": Math.floor(Math.random() * 1000 + 1) / 100
                },
                "drilling": {
                    "id": Math.floor((Math.random() * 1000) + 1),
                    "value": Math.floor(Math.random() * 1000 + 1) / 100
                },
                "groove": {
                    "id": Math.floor((Math.random() * 1000) + 1),
                    "value": Math.floor(Math.random() * 1000 + 1) / 100
                },
                "angle": {
                    "id": Math.floor((Math.random() * 1000) + 1),
                    "value": Math.floor(Math.random() * 1000 + 1) / 100
                },
                "patch": {
                    "id": Math.floor((Math.random() * 1000) + 1),
                    "value": Math.floor(Math.random() * 1000 + 1) / 100
                },
                "cutoff": {
                    "id": Math.floor((Math.random() * 1000) + 1),
                    "value": Math.floor(Math.random() * 1000 + 1) / 100
                }
            }
        );
    }
    return data;
}