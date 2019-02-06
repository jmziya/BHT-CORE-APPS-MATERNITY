var tt_cancel_destination = "/patients/show/<%= params[:patient_id] %>?skip_check=true"
var currentWeight;
var baby_date_map = "";
var displayText = "";
var apgarScore = 0; 
displaySummary = 'false'; 
var timedEvent;
var baby;
var maxi;
var mini;
var div_points_cell ;
function buildBabyApgar1stMin(){
    var frame = document.getElementById('inputFrame' + tstCurrentPage);
    frame.style.height = "90%";

    var div_for_table = document.createElement('div');
    frame.appendChild(div_for_table);

    var div_table = document.createElement('table');
    div_table.style.height = '80%';
    div_table.style.width = '100%';
    div_for_table.appendChild(div_table);

    var points_cells = [
        ['&nbsp;','0 Points','1 Point','2 Points'],
        ['Color','Pale/blue','Baby pink/blue extremities','Completely pink'],
        ['Heart Rate','Absent','Slow - Below 100 bpm','Above 100 bpm'],
        ['Muscle Tone','Flaccid','Some flexion of Extremities','Active Motion'],
        ['Reflex Irritability','None','Grimance','Vigorous cry'],
        ['Respiratory Effort','Absent','Slow - irregular','Good crying']
    ];

    for(var i=0; i < points_cells.length; i++) {

        var div_points_row = document.createElement('tr');
        div_table.appendChild(div_points_row);

        for(var j=0; j < points_cells[i].length ; j++) {
         div_points_cell = document.createElement('td');
            div_points_cell.innerHTML = points_cells[i][j];

            if(i === 0 && j >= 0) {
                div_points_cell.className = 'apgar_th apgar_text';
            } else if(i >= 1 && j >= 1) {
                if(i == 1 && j==1){

                }
                div_points_cell.className = 'apgar_btn';
                div_points_cell.style.border = '1px solid';
                div_points_cell.onclick = function(){ 
                        this.className = 'active';
                    };
                div_points_cell.dblclick = function(){ 
                            this.className = 'inactive';
                };

            } else {
                div_points_cell.className = 'apgar_text';
                div_points_cell.style.border = '1px solid';
            }


            div_points_row.appendChild(div_points_cell);
        }

    }


    var div_for_info = document.createElement('div');
    div_for_info.innerHTML = 'Info comes here.';
    div_for_info.style.border = '1px solid';
    div_for_info.style.height = '20%';
    frame.appendChild(div_for_info);
}

function buildBabyApgar5thMin(){
    var frame = document.getElementById('inputFrame' + tstCurrentPage);
    frame.style.height = "90%";

    var div_for_table = document.createElement('div');
    frame.appendChild(div_for_table);

    var div_table = document.createElement('table');
    div_table.style.height = '80%';
    div_table.style.width = '100%';
    div_for_table.appendChild(div_table);

   arr = ["Appearance", "Pulse", "Grimance", "Activity", "Respiration"]
   
    arr_val = ['Pale/blue', "Baby pink/</br>blue extremities", "Completely </br> pink",
      "Absent", "Slow -</br>Below 100 bpm", "Above </br>100 bpm",
      "Flaccid", "Some flexion </br> of Extremities", "Active Motion",
      "None", "Grimance", "Vigorous </br>cry",
      "Absent", "Slow - </br> irregular", "Good crying"];
    
    arr_labels = ["Color", "Heart Rate", "Muscle Tone", "Reflex Irritability", "Respiratory Effort"]
    for(var i=0; i < points_cells.length; i++) {

        var div_points_row = document.createElement('tr');
        div_table.appendChild(div_points_row);

        for(var j=0; j < points_cells[i].length ; j++) {
            var div_points_cell = document.createElement('td');
            div_points_cell.innerHTML = points_cells[i][j];

            if(i === 0 && j >= 0) {
                div_points_cell.className = 'apgar_th apgar_text';
            } else if(i >= 1 && j >= 1) {
                div_points_cell.className = 'apgar_btn';
                div_points_cell.style.border = '1px solid';
            } else {
                div_points_cell.className = 'apgar_text';
                div_points_cell.style.border = '1px solid';
            }


            div_points_row.appendChild(div_points_cell);
        }

    }

    var div_for_info = document.createElement('div');
    div_for_info.innerHTML = 'Info comes here.';
    div_for_info.style.border = '1px solid';
    div_for_info.style.height = '20%';
    frame.appendChild(div_for_info);
}

function growthIndicators(){
    $('inputFrame'+tstCurrentPage).innerHTML = "";
    //These values pulled from the tt_onLoad bit in the third form...
  
    headers = ["    ", "WEIGHT", "APGAR"];
    var alertsTable = document.createElement("div");
    alertsTable.id = "alertsTable";
    var alertsHeaderRow = document.createElement("div");
    alertsHeaderRow.setAttribute("class", "alertsHeaderRow");
    for (j = 0; j < headers.length; j++){
      var alertsHeader = document.createElement("div");
      alertsHeader.setAttribute("class", "alertsHeader");
      alertsHeader.innerHTML = headers[j];
      alertsHeaderRow.appendChild(alertsHeader);
    }
    alertsTable.appendChild(alertsHeaderRow);
      
    for (i = 1; i <= parseInt(document.getElementById("number_of_babies").value); i++){
      currentWeight = $('weight' + i).value;
      gender = $("baby_gender" + i).value;
      if (gender == "Male"){
        maxi = 4500.0;
        mini = 2500.0;
      }else if (gender == "Female"){
        maxi = 4400.0;
        mini = 2400.0;
      }

      var alertsRow = document.createElement("div");
      alertsRow.setAttribute("class", "alertsRow");
      // add the left title of the table row
      var alertsTitle = document.createElement("div");
      alertsTitle.setAttribute("class", "alertsTitle");
      alertsTitle.innerHTML = "<span>BABY " + i + "<span>";
      alertsRow.appendChild(alertsTitle);
      // add cell figures
     
      var alertsCell = document.createElement("div");
      alertsCell.setAttribute("class", "alertsCell");
      alertsCell.innerHTML = showWeightForAge(i);
      alertsRow.appendChild(alertsCell);

      var alertsCell2 = document.createElement("div");
      alertsCell2.setAttribute("class", "alertsCell");
      alertsCell2.innerHTML = showApgarScore(i);
      alertsRow.appendChild(alertsCell2);
        
      //add row to table
      alertsTable.appendChild(alertsRow);
    }
    $('inputFrame'+tstCurrentPage).appendChild(alertsTable);
    displayText = "";
   
  }


  function updateApgarAlert(apgarScore){   
    if (apgarScore >= 7){
      text = "" + apgarScore.toFixed(0) + "/10 - Normal APGAR</span>";
      alert.id = "normal_apgar_alert";
    } else if (apgarScore <=3) {
      text = "" + apgarScore.toFixed(0) + "/10 - Low APGAR</span>";
      alert.id = "red_apgar_alert";
    } else {
      text = "" + apgarScore.toFixed(0) + "/10 - Fairly Low </span>";
      alert.id = "yellow_apgar_alert";
    }
    alert.innerHTML = text;
  }
