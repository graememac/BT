(function(){
    
    var app = angular.module("bttest", []);
    
    app.controller('btCtrl', function($scope, $sce) {
        
        $scope.number_of_words = 0;
        $scope.full_stops = 0;
        $scope.commas = 0;
        
        $scope.update = function(){
            
            // put input into array
            $scope.input_array = $scope.input.split(" ");
            
            // create object for each letter. add empty array to object to hold words for each letter
            var number_of_words_array = [];
            var results_array = [];
            var letter_array = [];
            for (i=0; i<$scope.input_array.length; i++){
                
                object = {};
                first_letter = $scope.input_array[i].charAt(0);
                object['first_letter'] = first_letter.toUpperCase();
                object['words_array'] = [];
                
                if ($scope.input_array[i].length > 0){
                    number_of_words_array.push($scope.input_array[i]);
                }
                
                if ($scope.input_array[i].length > 0 && letter_array.indexOf(first_letter.toUpperCase()) === -1){
                    results_array.push(object);
                    letter_array.push(first_letter.toUpperCase());
                }
            }
            
            // populate each letter's array with words
            for (i=0; i<$scope.input_array.length; i++){
                
                if ($scope.input_array[i].length > 0){
                    
                    first_letter = $scope.input_array[i].charAt(0);
                    
                    for (j=0; j<results_array.length; j++){
                        
                        if (first_letter.toUpperCase() === results_array[j].first_letter){
                            results_array[j].words_array.push($scope.input_array[i].replace(".", "").replace(",", ""));
                        }
                    }
                }
            }
            
            // create output table
            $scope.output = "";
            for (k=0; k<results_array.length; k++){
                
                $scope.output += '<div class="letter_column letter_container"><div class="letter_box"><b>' + results_array[k].first_letter.toUpperCase() + '</b></div>';
                
                for (m=0; m<results_array[k].words_array.length; m++){
                    
                    $scope.output += '<div class="word_box">' + results_array[k].words_array[m] + '</div>';
                    
                }
                
                $scope.output += '</div>';
            }
            
            // output results to page
            $scope.output = $sce.trustAsHtml($scope.output);
            $scope.number_of_words = number_of_words_array.length;
            $scope.full_stops = ($scope.input.match(/\./g)||[]).length;
            $scope.commas = ($scope.input.match(/,/g)||[]).length;
        };
        
    });

})();