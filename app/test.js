import http from "k6/http";
import { check, sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  vus: 10,
  iterations: 100,
};

export default function () {
  //please select one to test
  testEndpointBycrptNative()
  testEndpointBycrptJS()
}

function testEndpointBycrptNative() {
  const url = "http://localhost:5000/login-bcrypt";
  const payload = JSON.stringify({
    user: "john.doe@email.com",
    password: "123456",
  });
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);
  check(res, {
    "is status 200": (r) => r.status === 200,
    "is accessToken available": (r) => r.body && r.body.includes("accessToken"),
  });

  sleep(1);
}

function testEndpointBycrptJS() {
  const url = "http://localhost:5000/login-bcryptjs";
  const payload = JSON.stringify({
    user: "john.doe@email.com",
    password: "123456",
  });
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);
  check(res, {
    "is status 200": (r) => r.status === 200,
    "is accessToken available": (r) => r.body && r.body.includes("accessToken"),
  });

  sleep(1);
}



export function handleSummary(data) {
  console.log("Preparing the end-of-test summary...");
  return {
    "./report/summary-native.html": htmlReport(data),
  };
}
