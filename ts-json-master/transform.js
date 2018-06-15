var traverse = require('traverse');

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var helperFuncs = {
  either: function(value, def) {
    if (value === '') return def;
    return value;
  },
  getDate: function(input) {
    if (!input) return new Date();
    return new Date(input);
  },
  getTime: function(date) {
    if (!date || date === '') return '';
    return new Date(date).getTime();
  },
  now: function() {
    return new Date().toISOString();
  },
  removePrefix: function(input, prefix) {
    return input.split(prefix)[1];
  },
};

function mapArray(dataArray, templateObj, helpers) {
  if (Array.isArray(dataArray)) {
    var outputArr = [];
    dataArray.forEach(function(obj) {
      var result = transform(templateObj, obj, helpers);
      outputArr.push(result);
    });
    return outputArr;
  }
  else {
    return '';
  }
}

var parentData;

function transformer(templateObj, data, helpers) {
  parentData = false;
  return transform(templateObj, data, helpers)
}

function transform(templateObj, data, helpers) {

  helpers = helpers || {};
  if (!parentData) {
    // do any pre-processing

    // see QEWD-Ripple labresults.js mapping for example of how this can be used

    if (helpers.init) {
      data = helpers.init(data);
      //console.log('data: ' + JSON.stringify(data, null, 2));
      parentData = data;
    }
  }

  for (var fn in helperFuncs) {
    if (!helpers[fn]) helpers[fn] = helperFuncs[fn];
  }

  function getActualValue(templateRef, data) {
    var pieces = templateRef.split("{{");
    var objRef = pieces[1];
    var before = pieces[0];
    pieces = objRef.split("}}");
    objRef = pieces[0];
    var after = pieces[1] || '';
    if (objRef[0] !== '[') {
      objRef = '.' + objRef;
    }
    var fn = new Function('data', 'return data' + objRef + ';');
    //console.log('fn: ' + fn);
    //console.log('** data = ' + JSON.stringify(data, null, 2));
    try {
      var result = fn(data);
      //console.log('***** result = ' + result);
      if (typeof result === 'undefined' || result === null) result = '';
      if (typeof result !== 'object' && isNumeric(result) && (before !== '' || after !== '')) {
        result = result.toString();
      }
      if (typeof result === 'string') result = before + result + after;
      return result;
    }
    catch(err) {
      // try using parentData object
      //console.log('** Unable to find input object - try parentData');
      try {
        result = fn(parentData);
        //console.log('***** result = ' + result);
        if (typeof result === 'undefined' || result === null) result = '';
        if (typeof result !== 'object' && isNumeric(result) && (before !== '' || after !== '')) {
          result = result.toString();
        }
        if (typeof result === 'string') result = before + result + after;
        return result;
      }
      catch(err) {
        //console.log('^^^^^ failed to map');
        return '';
      }
    }
  }

  var outputObj = traverse(templateObj).map(function(node) {
    if (typeof node === 'function') {
      this.update(node(data));
    }

    else if (Array.isArray(node)) {
      // is this a template definition for the array?

      if (node.length === 2 && node[0] && typeof node[0] === 'string' && node[0].indexOf('{{') !== -1) {
        var dataArr = getActualValue(node[0], data);
        if (!Array.isArray(dataArr)) dataArr = []; // ****
        var template = node[1];
        if (template) {
          //console.log('dataArr = ' + JSON.stringify(dataArr));
          //console.log('template = ' + JSON.stringify(template));
          var outputArr = mapArray(dataArr, template, helpers);
          this.update(outputArr);
        }
        else {
          this.update(dataArr);
        }
      }
    }

    else if (typeof node === 'string') {
      if (node.indexOf('{{') !== -1) {
        this.update(getActualValue(node, data));
        return;
      }

      if (node[0] === '=' && node[1] === '>') {
        var fn = node.split('=>')[1];
        //fn = fn.replace(/ /g,'');
        fn = fn.trim(); // remove leading & trailing spaces
        var pieces = fn.split('(');
        var fnName = pieces[0];
        var argStr = pieces[1].split(')')[0];
        var args = argStr.split(',');
        var argArr = [];
        if (args) {
          args.forEach(function(arg) {
            arg = arg.trim();
            if (arg === true || arg === 'true') {
              argArr.push(true);
              return;
            }
            if (arg === false || arg === 'false') {
              argArr.push(false);
              return;
            }
            if (arg[0] === '"' || arg[0] === "'") {
              arg = arg.slice(1, -1);
            }
            else {
              var argx = '{{' + arg + '}}';
              try {
                arg = getActualValue(argx, data);
              }
              catch(err) {};
            }
            argArr.push(arg);
          });
        }
        try {
          //console.log('*** argArr = ' + JSON.stringify(argArr));
          var result = helpers[fnName](...argArr);
          if (result === '<!delete>') {
            this.delete();
          }
          else {
            this.update(result);
          }
        }
        catch(err) {
          this.update("Error running: " + fnName + "('" + argArr + "')");
        }
      }
    }
  });
  return outputObj;
}

module.exports = transformer;