//call the smart contract on click
const SMART_CONTRACT_URL = "helloname.mhassanist.testnet"
const METHOD_NAME = "hello"

$("#btnSayHello").click(function (e) {
  e.preventDefault()
  //console.log("clicked")
  var nameInput = $("#name").val() //the input name
  paramsBase64 = btoa(JSON.stringify({ name: nameInput })) //convert the params into base64

  var settings = {
    url: "https://rpc.testnet.near.org",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "query",
      params: {
        request_type: "call_function",
        finality: "final",
        account_id: SMART_CONTRACT_URL,
        method_name: METHOD_NAME,
        args_base64: paramsBase64,
      },
    }),
  }

  $.ajax({
    ...settings,
    success: function (result) {
      //console.log("result")

      //convert the result to json string and extract the result attribute
      resultJson = JSON.stringify(result)
      resultTextBytes = JSON.stringify(JSON.parse(resultJson).result)
      resultString = String.fromCharCode
        .apply(String, JSON.parse(resultTextBytes).result) //convert ascii bytes to string
        .replace(/['"]+/g, "") //remove the leading and trailing qoutes

      //set the result in the h2 label
      $("#result").html(resultString)
    },
    error: function (e) {
      alert(e)
    },
  })
})
