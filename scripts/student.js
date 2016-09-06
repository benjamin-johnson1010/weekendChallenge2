console.log( 'JQuery Ajax JSON Example js sourced' );
var students = [];

var jsonURL = 'http://devjana.net/pi/pi_students.json';
$(document).ready(function(){
    var i = 0;
//used this data to equal last_name of student array to output the correct student button
    $('body').on('click', '.testerButton', function(){
      $('#outputDiv').empty();
      console.log('in testerButton');
      var testName = $(this).data('lastname');
      console.log(testName);
        function findStudent(){
          console.log('in findStudent');
          for(var b = 0; b < students.length; b++){
          if(testName == students[b].last_name){
            return b;

  }


}
}
i = findStudent();
displayStudents(students[i]).fadeIn();
});
//created click event to find the next student on the array
    $('body').on('click', '.next', function(){
      $('#outputDiv').empty();
      if(i < (students.length-1))
      i++;
      else{
        i = 0;
      }
      displayStudents(students[i]);
      });
      //created click event  to find the next student on the array
      $('body').on('click','.prev', function(){
        $('#outputDiv').empty();
        if(i > 0){
        i--;
      }
        else{
          i = (students.length-1);
        }
     displayStudents(students[i]);
    });
    //created a set interval to click the next bottom every 10 sec
    setInterval(function(){
    $('#outputDiv').empty();
      $('.next').click();
    }, 10000);

var displayStudents = function(){
    console.log( 'in displayStudents' );

    var newHeader = document.createElement( 'h2' );
    newHeader.textContent = students[i].first_name + ' ' + students[i].last_name;
    var newParagraph = document.createElement( 'p' );
    newParagraph.textContent = students[i].info ;
    var newCounter = document.createElement('p');
    newCounter.textContent = 'Student: ' + (i + 1) + '/' + students.length;
    $('#outputDiv').append( newHeader );
    $('#outputDiv').append( newParagraph );
    $('#outputDiv').append(newCounter);
};
});
var getStudents = function(){
  console.log( 'in getStudents' );
  $.ajax({
    url: jsonURL,
    dataType: 'JSON',
    success: function( data ){
      console.log( 'in success:', data.students );
      for( var i = 0; i < data.students.length; i++ ) {
        students.push( data.students[i] );
        //created btn to get display the student's first name on button on Dom
        var btn = $('<button/>',{
          text: students[i].first_name,
          class: 'testerButton',
                });
                //set btn datat to student's last name for click event function above
        btn.data('lastname', students[i].last_name);
        $('body').append(btn);
          }
          //set display student to show Will on page load
      var displayStudents = function(){
          console.log( 'in displayStudents' );

          var newHeader = document.createElement( 'h2' );
          newHeader.textContent = students[0].first_name + ' ' + students[0].last_name;
          var newParagraph = document.createElement( 'p' );
          newParagraph.textContent = students[0].info ;
          var newCounter = document.createElement('p');
          newCounter.textContent = "Student: " + 1 + "/" + students.length;
          $("#outputDiv").append( newHeader );
          $("#outputDiv").append( newParagraph );
          $("#outputDiv").append(newCounter);
        };
        displayStudents();
    }, // end success
    statusCode: {
      404: function(){
        alert( 'Cannot connect to server' );
      } // end 404
    } // end statu code 404 for error
  }); //end ajax
}; // end getStudents
