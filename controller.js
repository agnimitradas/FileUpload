myApp.controller('homeController', function ($scope, fileUploadService, $timeout) {
    $scope.fileContent = '';
    $scope.tableFlag = false;
    $scope.submit = function () {
        var file = document.getElementById("myFileInput").files[0];
        if (file) {
            var aReader = new FileReader();
            aReader.readAsBinaryString(file, "UTF-8");
            aReader.onload = function (evt) {
                $scope.fileContent = aReader.result[0];
                console.log(csvJSON(aReader.result));
                $scope.tableData = csvJSON(aReader.result);
                $timeout(function () {
                    $scope.tableFlag = true;
                })
            }
            aReader.onerror = function (evt) {
                document.getElementById("myFileInput").innerHTML = "error";
                $scope.fileContent = "error";
            }
        }
    }

    function csvJSON(csv) {
        var lines = csv.split("\n");
        lines.pop();
        var result = [];
        var headers = lines[0].split(",");
        for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(",");
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
                //                obj["fieldName"] = headers[j];
                //                obj["fieldValue"] = currentline[j];
                //                result.push(obj);
                //                console.log(result);
            }
            result.push(obj)
        }
        return result; //JSON
    }
    
    $scope.executeQuery = function(){
        var selectedRows = [];
         angular.forEach($scope.tableData, function (value, key) {
             if (value.checked) {
                 selectedRows.push(value);
             }
         });
    }
   
});