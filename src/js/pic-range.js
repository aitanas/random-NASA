export default class PicRange {
  static getPicRange(startDate, endDate) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.API_KEY}`;
      request.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, startDate, endDate]);
        } else {
          reject([this, response, startDate, endDate]);
        }
      });
      request.open("GET", url, true);
      request.send();
    })
  };
}
