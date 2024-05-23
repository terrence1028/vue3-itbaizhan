const express = require("express");
const router = express.Router();
const url = require("url");
const SQLConnect = require("./SQLConnect.js");
const jwt = require("jsonwebtoken")
const jwtSecret = require("./jwtSecret.js");
const { log } = require("console");
const adminData = require("./data/admin.js")
const vipData = require("./data/vip.js")
const lineData = require("./data/line.js");
const multer = require ("multer")
const fs = require("fs")

// 登錄接口
router.post("/login", (req, res) => {
  console.log(req.body);
  // 接受客户端的参数：username， password
  const { username, password } = req.body;
  console.log(username, password);
  const sql = "select * from user where username=? and password=?";
  SQLConnect(sql, [username, password], (result) => {
    if (result.length > 0) {
      console.log(result[0].permission);
      /**
     * 生成token
     */
      const token = jwt.sign({
        id: result[0].id,
        result: result[0].username,
        permission: result[0].permission,
      }, jwtSecret.secret)
      res.send({
        status: 200,
        username: result[0].username,
        permission: result[0].permission,
        token,
      })
    } else {
      res.send({
        status: 500,
        msg: "用戶名或密碼錯誤",
      })
    }
  })
})


// 用戶權限管理
router.get("/router", (req, res) => {
  const user = url.parse(req.url, true).query.user;
  switch (user) {
    case "admin":
      res.send({
        status: 200,
        menuData: adminData
      })
      break;
    case "vip":
      res.send({
        status: 200,
        menuData: vipData
      })
      break;
    default:
      res.send({
        status: 200,
        menuData: vipData
      })
      break;
  }
})

router.get("/line", (req, res) => {
  res.send({
    status: 200,
    result: lineData
  })
})

/**
 * 隧道信息查询
 */
router.get("/project/all", (req, res) => {
  // 分頁
  var page = url.parse(req.url, true).query.page || 1;
  const sql =
    "select * from project order by id desc limit 15 offset " + (page - 1) * 15;
  SQLConnect(sql, null, (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result,
      });
    } else {
      res.send({
        status: 500,
        msg: "暫無信息",
      });
    }
  });
});

//隧道模糊查詢
router.get("/project/search", (req, res) => {
  //接收參數，查詢內容
  const search = url.parse(req.url, true).query.search;
  //sql語句編寫：模糊查詢
  const sql = "select * from project where concat(`name`,`address`,`remark`) like '%" + search + "%' ";
  SQLConnect(sql, null, result => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result
      })
    } else {
      res.send({
        status: 500,
        msg: "暫無數據"
      })
    }
  })
})

// 獲得總頁數 查詢一共有多少數據
router.get("/project/total", (req, res) => {
  const sql = "select count(*) from project where id";
  SQLConnect(sql, null, result => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result
      })
    } else {
      res.send({
        status: 500,
        msg: "暫無數據"
      })
    }
  })
})

//隧道添加
router.get("/project/add", (req, res) => {
  var name = url.parse(req.url, true).query.name || "";
  var number = url.parse(req.url, true).query.number || "";
  var money = url.parse(req.url, true).query.money || "";
  var address = url.parse(req.url, true).query.address || "";
  var duration = url.parse(req.url, true).query.duration || "";
  var startTime = url.parse(req.url, true).query.startTime || "";
  var endTime = url.parse(req.url, true).query.endTime || "";
  var quantity = url.parse(req.url, true).query.quantity || "";
  var status = url.parse(req.url, true).query.status || "";
  var remark = url.parse(req.url, true).query.remark || "";
  const sql = "insert into project values (null,?,?,?,?,?,?,?,?,?,?)";
  const arr = [
    name,
    number,
    money,
    address,
    duration,
    startTime,
    endTime,
    quantity,
    status,
    remark,
  ];
  SQLConnect(sql, arr, (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "添加成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "添加失败",
      });
    }
  });
});

/**
 * 隧道信息 删除
 */
router.get("/project/del", (req, res) => {
  var id = url.parse(req.url, true).query.id;
  var sql = "delete from project where id=?";
  SQLConnect(sql, [id], (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "删除成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "删除失败",
      });
    }
  });
});

/**
 * 隧道 預更新
 */
router.get("/project/update/pre", (req, res) => {
  const id = url.parse(req.url, true).query.id;
  const sql = "select * from project where id=?";
  SQLConnect(sql, [id], (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result: result[0],
      });
    } else {
      res.send({
        status: 500,
        msg: "預更新失敗",
      });
    }
  });
});

/**
 * 修改隧道
 *
 * restFull API
 *     get
 *     post
 *     put
 *     del
 *     ...
 */
router.put("/project/update/:id", (req, res) => {
  const id = req.params.id;
  const {
    name,
    number,
    money,
    address,
    duration,
    startTime,
    endTime,
    quantity,
    status,
    remark,
  } = req.body;
  const sql =
    "update project set name=?,number=?,money=?,address=?,duration=?,startTime=?,endTime=?,quantity=?,status=?,remark=? where id=?";
  const arr = [
    name,
    number,
    money,
    address,
    duration,
    startTime,
    endTime,
    quantity,
    status,
    remark,
    id,
  ];
  SQLConnect(sql, arr, (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "修改成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "修改失敗",
      });
    }
  });
});

/**
 * 隧道設计信息 tree列表 一级
 */
router.get("/tunnel/list", (req, res) => {
  const sql = "select * from tunnel";
  SQLConnect(sql, null, (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result,
      });
    } else {
      res.send({
        status: 500,
        msg: "暫無數據",
      });
    }
  });
});

/**
 * 隧道設计信息 tree列表 二级
 */
router.get("/tunnel/list/child", (req, res) => {
  const cid = url.parse(req.url, true).query.cid;
  const sql = "select * from tunnelchild where cid=?";
  SQLConnect(sql, [cid], (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result,
      });
    } else {
      res.send({
        status: 500,
        msg: "暫無數據",
      });
    }
  });
});

/**
 * 隧道設计信息 内容
 */
router.get("/tunnel/content", (req, res) => {
  const content = url.parse(req.url, true).query.content;
  const sql = "select * from tunnelcontent where content=?";
  SQLConnect(sql, [content], (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result,
      });
    } else {
      res.send({
        status: 500,
        msg: "暫無數據",
      });
    }
  });
});

/**
 * 文件上傳
 * http://localhost:3000/api/upload
 */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var createFolder = function (folder) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
};

var uploadFolder = "./upload/";
createFolder(uploadFolder);
var upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), function (req, res, next) {
  var file = req.file;
  console.log("文件类型：%s", file.mimetype);
  console.log("原始文件名：%s", file.originalname);
  console.log("文件大小：%s", file.size);
  console.log("文件保存路径：%s", file.path, "11");
  res.json({ res_code: "0", name: file.originalname, url: file.path });
});

/**
 * 更新隧道設计信息-content-url
 */
router.get("/tunnel/content/url", (req, res) => {
  // id  url
  const id = url.parse(req.url, true).query.id;
  const urlName = url.parse(req.url, true).query.urlName;
  const sql = "update tunnelcontent set url=? where id=?";
  SQLConnect(sql, [urlName, id], (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "上傳成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "上傳失败",
      });
    }
  });
});

/**
 * PDF預覽
 */
router.get("/tunnel/pdf", (req, res) => {
  const id = url.parse(req.url, true).query.id;
  const sql = "select * from tunnelcontent where id=?";
  SQLConnect(sql, [id], (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result: result[0],
      });
    } else {
      res.send({
        status: 500,
        msg: "暂無數據",
      });
    }
  });
});

/**
 * 用户列表
 */
router.get("/user/list", (req, res) => {
  const sql = "select * from user";
  SQLConnect(sql, null, (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result,
      });
    } else {
      res.send({
        status: 500,
        msg: "暂无数据",
      });
    }
  });
});

/**
 * 用户搜索
 */
router.get("/user/search", (req, res) => {
  const search = url.parse(req.url, true).query.search;
  const sql =
    "select * from user where concat(`username`,`permission`,`phone`) like '%" +
    search +
    "%'";
  SQLConnect(sql, null, (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result,
      });
    } else {
      res.send({
        status: 500,
        msg: "暂无数据",
      });
    }
  });
});

/**
 * 用户添加
 */
router.get("/user/add", (req, res) => {
  const username = url.parse(req.url, true).query.username;
  const password = url.parse(req.url, true).query.password;
  const permission = url.parse(req.url, true).query.permission;
  const phone = url.parse(req.url, true).query.phone;
  const sql = "insert into user values (null,?,?,?,?)";
  SQLConnect(sql, [username, password, permission, phone], (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "添加成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "添加失败",
      });
    }
  });
});

/**
 * 用户删除
 */
router.get("/user/del", (req, res) => {
  const id = url.parse(req.url, true).query.id;
  if (id == 1) return;
  const sql = "delete from user where id=?";
  SQLConnect(sql, [id], (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "删除成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "删除失败",
      });
    }
  });
});

/**
 * 用户預更新
 */
router.get("/user/preview", (req, res) => {
  const id = url.parse(req.url, true).query.id;
  const sql = "select * from user where id=?";
  SQLConnect(sql, [id], (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result,
      });
    } else {
      res.send({
        status: 500,
        msg: "暂无数据",
      });
    }
  });
});

/**
 * 用户修改
 */
router.get("/user/update", (req, res) => {
  const id = url.parse(req.url, true).query.id;
  const password = url.parse(req.url, true).query.password;
  const permission = url.parse(req.url, true).query.permission;
  const phone = url.parse(req.url, true).query.phone;
  const sql = "update user set password=?,permission=?,phone=? where id=?";
  SQLConnect(sql, [password, permission, phone, id], (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "修改成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "修改失败",
      });
    }
  });
});

/**
 * 用户預更新
 */
router.get("/user/preview", (req, res) => {
  const id = url.parse(req.url, true).query.id;
  const sql = "select * from user where id=?";
  SQLConnect(sql, [id], (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result,
      });
    } else {
      res.send({
        status: 500,
        msg: "暫無數據",
      });
    }
  });
});

/**
 * 用户修改
 */
router.get("/user/update", (req, res) => {
  const id = url.parse(req.url, true).query.id;
  const password = url.parse(req.url, true).query.password;
  const permission = url.parse(req.url, true).query.permission;
  const phone = url.parse(req.url, true).query.phone;
  const sql = "update user set password=?,permission=?,phone=? where id=?";
  SQLConnect(sql, [password, permission, phone, id], (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "修改成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "修改失敗",
      });
    }
  });
});

module.exports = router;
