$(document).ready(function () {
    Parse.initialize("2LVi75uNxQ5Xac9JlSQ1XEuUPE6zRFsWHlUQUm3C", "UVlQaoFI6pd3pzPs3awRp8B76mZIloSNyH2AxnoB");

    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
    testObject.save({ foo: "bar" }).then(function (object) {
        alert("yay! it worked");
    });
})