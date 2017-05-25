var windowMock = {
  document: {
    cookie: '',
    split: function(){},
    indexOf: function(){}
  }
};

global.window = windowMock;
