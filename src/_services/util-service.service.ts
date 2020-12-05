import { Injectable } from "@angular/core";
import { isNumeric } from "rxjs/util/isNumeric";
import { Router } from "@angular/router";

@Injectable()
export class UtilServiceService {
  constructor(private router: Router) {}

  public IsValidJson(inputJson): boolean {
    try {
      JSON.parse(inputJson);
      return true;
    } catch (e) {
      return false;
    }
  }

  public IsNumeric(inputValue): boolean {
    if (isNumeric(inputValue)) {
      return true;
    } else {
      return false;
    }
  }

  public exportTableToCSV(tableElement, filename) {
    var csv = [];
    var rows = tableElement.querySelectorAll("thead tr:last-child");

    var fn = function(row, cols) {
      for (var j = 0; j < cols.length; j++) {
        var text = cols[j].innerText
          .replace(new RegExp(",", "g"), "")
          .replace(/(?:\r\n|\r|\n)/g, " ");
        row.push(text);
      }

      csv.push(row.join(","));
    };

    for (var i = 0; i < rows.length; i++) {
      var row = [],
        cols = rows[i].querySelectorAll("th");

      fn(row, cols);
    }

    rows = tableElement.querySelectorAll("tbody tr");

    for (var i = 0; i < rows.length; i++) {
      var row = [],
        cols = rows[i].querySelectorAll("td");

      fn(row, cols);
    }

    // Download CSV file
    this.downloadCSV(csv.join("\n"), filename);
  }

  public downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;
    csv = "\ufeff" + csv;
    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" });

    // Download link
    downloadLink = document.createElement("a");

    if (filename == undefined || filename == "") {
      filename = "report.csv";
    }
    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
  }

  public ConvertToEnglishNumber(strNumber: string): string {
    const persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];
    const arabicNumbers = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"];
    const englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    return strNumber
      .split("")
      .map(
        c =>
          englishNumbers[persianNumbers.indexOf(c)] ||
          englishNumbers[arabicNumbers.indexOf(c)] ||
          c
      )
      .join("");
  }

  public isValidMobile(mobile) {
    if (mobile.length == 14 && mobile.substring(0, 4) == "0098") {
      mobile = "0" + mobile.substring(4);
    }
    if (mobile.length == 13 && mobile.substring(0, 3) == "+98") {
      mobile = "0" + mobile.substring(3);
    }
    if (mobile.length == 10 && mobile.substring(0, 1) == "9") {
      mobile = "0" + mobile;
    }
    if (this.IsNumeric(mobile)) {
      return false;
    }
    if (mobile.length != 11) {
      return false;
    }
    if (mobile.substring(0, 2) != "09") {
      return false;
    }
    return true;
  }

  public PlaySound(soundPath: string) {
    let audio = new Audio();
    audio.src = soundPath;
    audio.load();
    audio.play();
  }

  public redirectToLink(uri: string) {
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }

  public shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
    //How To Use This Function
    // var arr = [2, 11, 37, 42];
    // shuffle(arr);
    // console.log(arr);
  }

  public ReplaceAll(str: string, fromChar: string, toChar: string): string {
    let result = str.split(fromChar).join(toChar);
    return result;
  }
}
