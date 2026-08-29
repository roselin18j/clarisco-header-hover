var express = require("express");
const async = require("async");
const router = express.Router({ caseSensitive: true });
const axios = require("axios");
const pages = require("../models/pages");
const blogs = require("../models/blog");
var contact = require("../models/contact");
const demo = require("../models/demo_contact");
const newcontact = require("../models/newcontact");
const sendmail = require("../routes/bsendmail");
const settings = require("../models/settings");
const blog_category = require("../models/blog-category");
const pdfform = require("../models/pdf-from.js");
const blogform = require("../models/blog-form.js");
const keys = require("../config/config.js");

const fs = require("fs");
const xmlParser = require("xml2json");
const formatXml = require("xml-formatter");

const request = require("request");
const secretKey = "6LfG6-MgAAAAANQVRFlwL6kTr-BG3n0odepdpgqD";

// Short-lived in-memory cache for page render data (cmsdata/blogsdata) that
// changes rarely but is otherwise re-fetched from Mongo on every request.
// Keyed by page_link since that uniquely identifies the page's combined result.
const pageDataCache = new Map();
const PAGE_DATA_CACHE_TTL_MS = 5 * 60 * 1000;
function cachedParallel(cacheKey, tasks, cb) {
  const hit = pageDataCache.get(cacheKey);
  if (hit && hit.expiresAt > Date.now()) {
    return cb(null, hit.results);
  }
  async.parallel(tasks, function (err, results) {
    if (!err) {
      pageDataCache.set(cacheKey, { results, expiresAt: Date.now() + PAGE_DATA_CACHE_TTL_MS });
    }
    cb(err, results);
  });
}

router.get("/", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: "home-page" }).exec(cb);
      },
    },
    function (err, results) {
      res.render("index.ejs", { metadata: results.cmsdata });
    },
  );
});

// <============>
router.get("/rummy-game-development", async function (req, res) {
res.redirect(302, "/game-development-company")
});
router.get("/game-development-services", async function (req, res) {
res.redirect(302, "/game-development-company")
});
router.get("/game-development-company", async function (req, res) {
  const path = req.path.split("/");

  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },

      blogsdata: function (cb) {
        blogs
          .find({ blog_category: "Game" }) 
          .limit(3)
          .sort({ _id: -1 })
          .exec(cb);
      },
    },
    function (err, results) {
      if (err) {
        return res.status(500).send(err);
      }

      res.render("Game/gamedevelopment", {
        metadata: results.cmsdata,
        blogsdata: results.blogsdata,
      });
    }
  );
});

router.get("/aaa-game-co-development-company", async function (req, res) {
  const path = req.path.split("/");

  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },

      blogsdata: function (cb) {
        blogs
          .find({ blog_category: "Game" }) 
          .limit(3)
          .sort({ _id: -1 })
          .exec(cb);
      },
    },
    function (err, results) {
      if (err) {
        return res.status(500).send(err);
      }

      res.render("Game/co-game", {
        metadata: results.cmsdata,
        blogsdata: results.blogsdata,
      });
    }
  );
});

router.get("/full-cycle-game-development-outsourcing", async function (req, res) {
  const path = req.path.split("/");

  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },

      blogsdata: function (cb) {
        blogs
          .find({ blog_category: "Game" }) 
          .limit(3)
          .sort({ _id: -1 })
          .exec(cb);
      },
    },
    function (err, results) {
      if (err) {
        return res.status(500).send(err);
      }

      res.render("Game/fullcycle-gamedevelopment", {
        metadata: results.cmsdata,
        blogsdata: results.blogsdata,
      });
    }
  );
});

router.get("/unity-game-development-services", async function (req, res) {
  const path = req.path.split("/");

  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },

      blogsdata: function (cb) {
        blogs
          .find({ blog_category: "Game" }) 
          .limit(3)
          .sort({ _id: -1 })
          .exec(cb);
      },
    },
    function (err, results) {
      if (err) {
        return res.status(500).send(err);
      }

      res.render("Game/unity-gamedevelopment", {
        metadata: results.cmsdata,
        blogsdata: results.blogsdata,
      });
    }
  );
});

router.get("/unreal-engine-game-development-services", async function (req, res) {
  const path = req.path.split("/");

  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },

      blogsdata: function (cb) {
        blogs
          .find({ blog_category: "Game" }) 
          .limit(3)
          .sort({ _id: -1 })
          .exec(cb);
      },
    },
    function (err, results) {
      if (err) {
        return res.status(500).send(err);
      }

      res.render("Game/unreal-gamedevelopment", {
        metadata: results.cmsdata,
        blogsdata: results.blogsdata,
      });
    }
  );
});

router.get("/game-art-outsourcing-2d-3d-animation", async function (req, res) {
  const path = req.path.split("/");

  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },

      blogsdata: function (cb) {
        blogs
          .find({ blog_category: "Game" }) 
          .limit(3)
          .sort({ _id: -1 })
          .exec(cb);
      },
    },
    function (err, results) {
      if (err) {
        return res.status(500).send(err);
      }

      res.render("Game/game-art-outsourcing", {
        metadata: results.cmsdata,
        blogsdata: results.blogsdata,
      });
    }
  );
});

router.get("/game-porting-services-cross-platform-development-studio", async function (req, res) {
  const path = req.path.split("/");

  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },

      blogsdata: function (cb) {
        blogs
          .find({ blog_category: "Game" }) 
          .limit(3)
          .sort({ _id: -1 })
          .exec(cb);
      },
    },
    function (err, results) {
      if (err) {
        return res.status(500).send(err);
      }

      res.render("Game/game-porting-services", {
        metadata: results.cmsdata,
        blogsdata: results.blogsdata,
      });
    }
  );
});

router.get("/case-study/gold-tokenization-platform", function (req, res) {
  const path = req.path.split("/");
  console.log(path[2]);
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] + "/" + path[2] }).exec(cb);
      },
    },

    function (err, results) {
      try {
        res.render("case-study/gold-tokenization-platform.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get(
  "/case-study/ai-powered-digital-asset-tokenization-platform",
  function (req, res) {
    const path = req.path.split("/");
    console.log(path[2]);
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] + "/" + path[2] }).exec(cb);
        },
      },

      function (err, results) {
        try {
          res.render(
            "case-study/ai-powered-digital-asset-tokenization-platform.ejs",
            { metadata: results.cmsdata },
          );
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);
router.get(
  "/case-study/ai-powered-rwa-tokenization-platform-development-case-study",
  function (req, res) {
    const path = req.path.split("/");
    console.log(path[2]);
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] + "/" + path[2] }).exec(cb);
        },
      },

      function (err, results) {
        try {
          res.render("case-study/ai-powered-rwa-tokenization.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);
router.get(
  "/case-study/commodity-backed-cryptocurrency-and-token-selling-platform",
  function (req, res) {
    const path = req.path.split("/");
    console.log(path[2]);
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] + "/" + path[2] }).exec(cb);
        },
      },

      function (err, results) {
        try {
          res.render("case-study/Commodity.ejs", { metadata: results.cmsdata });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);

router.get(
  "/case-study/crypto-based-payment-gateway-platform-for-online-rummy-game",
  function (req, res) {
    const path = req.path.split("/");
    console.log(path[2]);
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] + "/" + path[2] }).exec(cb);
        },
      },

      function (err, results) {
        try {
          res.render("case-study/Payment-gateway-platform.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);

router.get(
  "/case-study/digital-asset-exchange-platform-development",
  function (req, res) {
    const path = req.path.split("/");
    console.log(path[2]);
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] + "/" + path[2] }).exec(cb);
        },
      },

      function (err, results) {
        try {
          res.render("case-study/Digital-asset-exchange.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);

router.get(
  "/case-study/advanced-cryptocurrency-exchange-solution",
  function (req, res) {
    const path = req.path.split("/");
    console.log(path[2]);
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] + "/" + path[2] }).exec(cb);
        },
      },

      function (err, results) {
        try {
          res.render("case-study/advanced-cryptocurrency-exchange-solution", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);

router.get(
  "/case-study/blockchain-ecosystem-development-solution",
  function (req, res) {
    const path = req.path.split("/");
    console.log(path[2]);
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] + "/" + path[2] }).exec(cb);
        },
      },

      function (err, results) {
        try {
          res.render("case-study/blockchain-ecosystem-development-solution", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);

router.get(
  "/case-study/best-multi-crypto-blockchain-explorer-platform",
  function (req, res) {
    const path = req.path.split("/");
    console.log(path[2]);
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] + "/" + path[2] }).exec(cb);
        },
      },

      function (err, results) {
        try {
          res.render(
            "case-study/best-multi-crypto-blockchain-explorer-platform",
            { metadata: results.cmsdata },
          );
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);

router.get(
  "/case-study/blockchain-solutions-futuristic-transactions",
  function (req, res) {
    const path = req.path.split("/");
    console.log(path[2]);
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] + "/" + path[2] }).exec(cb);
        },
      },

      function (err, results) {
        try {
          res.render(
            "case-study/blockchain-solutions-futuristic-transactions",
            { metadata: results.cmsdata },
          );
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);

router.get(
  "/case-study/secure-blockchain-solutions-for-business",
  function (req, res) {
    const path = req.path.split("/");
    console.log(path[2]);
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] + "/" + path[2] }).exec(cb);
        },
      },

      function (err, results) {
        try {
          res.render("case-study/secure-blockchain-solutions-for-business", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);

router.get(
  "/case-study/neo-banking-solutions-with-fiat-crypto-integration",
  function (req, res) {
    const path = req.path.split("/");
    console.log(path[2]);
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] + "/" + path[2] }).exec(cb);
        },
      },

      function (err, results) {
        try {
          res.render(
            "case-study/neo-banking-solutions-with-fiat-crypto-integration",
            { metadata: results.cmsdata },
          );
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);

router.get("/case-study/mlm-revolution-with-clarisco", function (req, res) {
  const path = req.path.split("/");
  console.log(path[2]);
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] + "/" + path[2] }).exec(cb);
      },
    },

    function (err, results) {
      try {
        res.render("case-study/mlm-revolution-with-clarisco", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

// <===========>

router.get("/crypto-trading-bot-development", function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).lean().exec(cb);
      },
            blogsdata: function (cb) {
          blogs
            .find({ blog_category: "Trading Bot" })
            .select("blog_title blog_link blogimg blog_category date blog_meta_description")
            .limit(3)
            .sort({ _id: -1 })
            .lean()
            .exec(cb);
        },
    },
    function (err, results) {
      try {
        res.render("trading-bot/crypto-trading-bot-development.ejs", {
          metadata: results.cmsdata,
             blogsdata: results.blogsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});



router.get("/refund-policy", function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Pages/RefundPolicy.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

// <===========>
router.get("/crypto-arbitrage-bot-development-company", function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).lean().exec(cb);
      },
       blogsdata: function (cb) {
          blogs
            .find({ blog_category: "Trading Bot" })
            .select("blog_title blog_link blogimg blog_category date blog_meta_description")
            .limit(3)
            .sort({ _id: -1 })
            .lean()
            .exec(cb);
        },
    },
    function (err, results) {
      try {
        res.render("trading-bot/crypto-arbitrage-bot-development-company.ejs", {
          metadata: results.cmsdata,
                    blogsdata: results.blogsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

// <============>
// <==========>
router.get("/flash-loan-arbitrage-bot-development", function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).lean().exec(cb);
      },
      blogsdata: function (cb) {
          blogs
            .find({ blog_category: "Trading Bot" })
            .select("blog_title blog_link blogimg blog_category date blog_meta_description")
            .limit(3)
            .sort({ _id: -1 })
            .lean()
            .exec(cb);
        },
    },
    function (err, results) {
      try {
        res.render("trading-bot/flash-loan-arbitage-bot-development.ejs", {
          metadata: results.cmsdata,
            blogsdata: results.blogsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
// <==========>

router.get("/token-development-company", function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Customweb/Tokendevelopmentcompany.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
// <===============>

router.get("/crypto-market-making-bot-development", function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
      blogsdata: function (cb) {
          blogs
            .find({ blog_category: "Trading Bot" })
            .limit(3)
            .sort({ _id: -1 })
            .exec(cb);
        },
    },
    function (err, results) {
      try {
        res.render("trading-bot/crypto-market-making-bot-development.ejs", {
          metadata: results.cmsdata,
            blogsdata: results.blogsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

// <================>

// <==============>

router.get("/dca-trading-bot-development-company", function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("trading-bot/dca-trading-bot-development-company.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

// <==============>

// <==============>

router.get("/grid-trading-bot-development", function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("trading-bot/grid-trading-bot-development.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

// <==============>
// <==============>

router.get("/vfx-services", function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("vfx-company/vfx-services.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/neo-banking-solution-provider", function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Bankingsolutions/neo-banking-solution-provider.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/custom-web-application-development-company", function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Customweb/Customwebapplication.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/custom-software-development-company", function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("custom-software/custom-software-development-company.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

// portofolio
router.get("/mlm-valobit", function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/MlmValobit.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/propelx-mlm", function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/PropelXMLM", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/torabit-mlm", function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/TorabitMLM", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/texaforce", function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/Texaforce", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/willgrow", function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/WillGrow", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/amct", function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/amct", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/forex-coin", function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/ForexCoin.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/fibit-pro", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/FibitProBinanceClone.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/bitproex", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/BitproexBinanceClone.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/bitnevex-exchange", function (req, res, next) {
  res.redirect(301, "/nvxo-exchange");
});
router.get("/bitnevex-exchange-", function (req, res, next) {
  res.redirect(301, "/nvxo-exchange");
});
router.get("/security-token-offering", function (req, res, next) {
  res.redirect(301, "/sto-development-company");
});
router.get("/sto-development-company-", function (req, res, next) {
  res.redirect(301, "/sto-development-company");
});
router.get("/nvxo-exchange", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/NVXOExchange.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/unitic", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/Unitic.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/meterex", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/Meterex.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/freemex", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/Freemex.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/premex", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/Premex.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/blx-exchange", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/BlxExchange.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/iyaan", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/IYAAN.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/openbit", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/Openbit.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/getxexchange", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/getxexchange.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/d-flash-loan-bot", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/Dflashloanbot.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/valobit-market-making", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/ValobitMarketMaking.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/valobit-arbitrage-bot", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/ValobitArbitrageBot.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/telegram-mini-bot", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/TelegramMiniBot.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get(
  "/portfolio/ai-powered-arbitrage-trading-bot-development",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("PortfolioDetail/Arbitrage.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);

router.get(
  "/portfolio/copy-trading-bot-development",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("PortfolioDetail/Copytrading.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);

router.get("/bkc-blockchain", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/BkcBlockchain.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/voex", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/VoexOpenseaClone.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/d-chain", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/DChain.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/ivaan-blockchain", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/Ivaan-blockchain.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/texaforce-blockchain", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/Texaforce-Blockchain.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/bkc", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/Bkc.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/d-wallet", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/DWallet.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/kerdos", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/Kerdos.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get(
  "/portfolio/ai-powered-smart-crypto-wallet-development",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("PortfolioDetail/Ai-powered-smart-crypto-wallet.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);

router.get(
  "/portfolio/non-custodial-crypto-browser",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("PortfolioDetail/Non-custodial-crypto-browser.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);

router.get(
  "/portfolio/enterprise-multi-signature-crypto-wallet",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render(
            "PortfolioDetail/Enterprise-multi-signature-crypto-wallet.ejs",
            {
              metadata: results.cmsdata,
            },
          );
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);

router.get(
  "/portfolio/crypto-wallet-mobile-app-development",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render(
            "PortfolioDetail/Crypto-wallet-mobile-app-development.ejs",
            {
              metadata: results.cmsdata,
            },
          );
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);
router.get("/sitto", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/sitto.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/d-ecosystem", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/DEcosystem.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/siito-scan", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/SiitoScan.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/valobit-blockchain", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/ValobitBlockchain.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/unitic-exchange", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/UniticExhange.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/siito-scan", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/SiitoScan.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/rempic", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/Rempic.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/bitnevex", function (req, res, next) {
  res.redirect(301, "/nvxo");
});

router.get("/nvxo", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/NVXO.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/dictys", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/Dictys.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/newme", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/New-me.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/alphanis", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/Alphanis.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get(
  "/ai-powered-rwa-tokenization-platform-development",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("PortfolioDetail/RWATokenization.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);
router.get(
  "/portfolio/private-credit-bond-tokenization-platform",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("PortfolioDetail/Private-credit-bond-tokenization.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);
router.get(
  "/portfolio/real-estate-tokenization-platform",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("PortfolioDetail/RealEstateTokenization.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);
router.get(
  "/portfolio/carbon-credits-tokenization-platform",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("PortfolioDetail/CarbonCreditsTokenization.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);
router.get(
  "/portfolio/real-world-asset-tokenization-platform",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("PortfolioDetail/AssetTokenization.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);
router.get("/portfolio/gold-tokenization-platform", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/GoldTokenization.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/nexus-ai-prediction-marketplace", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/NexusAI.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/ai-powered-alphanis", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/ai-powered-alphanis.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/ai-trading-bot", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/ai-trading-bot.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get(
  "/portfolio/ai-powered-content-creation-engine",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("PortfolioDetail/Ai-powered-content.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);

router.get("/portfolio/predictive-ai-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/Predictive-ai-development.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get(
  "/portfolio/ai-agent-customer-engagement-platform",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render(
            "PortfolioDetail/Ai-agent-customer-engagement-platform.ejs",
            {
              metadata: results.cmsdata,
            },
          );
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);

router.get("/codeasalai", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/Codeasalai.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/koh-chang-holidays", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/Koh-Chang-Holidays.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/rummy-game", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/Online-Rummy-Game.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/acube", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/Acube.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/portfolio", async function (req, res) {
  const path = req.path.split("/");

  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioNew/PortfolioNew.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
// game
router.get("/wraithbound-multiplayer-rpg", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/Multiplayer-action.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/verdant-nexus-3d-world", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/Verdantnexus.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/curiosphere-ar-learning", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("PortfolioDetail/Curiosphere.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
// new

router.get(
  "/centralized-crypto-exchange-development",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("Exchange/cex-crypto-exchange.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);

router.get("/web3-development-company", async function (req, res) {
  const path = req.path.split("/");

  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("newPages/Web3DevelopmentCompany.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/business-consulting-services", async function (req, res) {
  const path = req.path.split("/");

  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("newPages/BusinessConsultingServices.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get(
  "/carbon-credits-nft-marketplace-platform",
  async function (req, res) {
    const path = req.path.split("/");

    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("newPages/CarbonCreditsNFTMarketplace.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);
router.get("/ethereum-smart-contract-mlm-software", async function (req, res) {
  const path = req.path.split("/");

  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("newPages/ethereumSmartContractMlmSoftware.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/metaforce-clone-script", async function (req, res) {
  const path = req.path.split("/");

  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("newPages/MetaforceCloneScript.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/coinbase-nft-marketplace-clone-script", async function (req, res) {
  const path = req.path.split("/");

  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("newPages/coinbaseNftMarketplaceCloneScript.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
// new

router.get("/5-reasons-choose-binance-clone-script", function (req, res, next) {
  res.redirect(301, "/5-reasons-to-choose-binance-clone");
});
router.get(
  "/crypto-derivatives-exchange-developement-company",
  function (req, res, next) {
    res.redirect(301, "/crypto-derivatives-exchange-development-company");
  },
);
router.get("/product/t-shirt/", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/product-category/music/", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/product-category/clothing/", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/binance-", function (req, res, next) {
  res.redirect(301, "/binance-clone-script");
});
router.get("/binance-clone-scrip", function (req, res, next) {
  res.redirect(301, "/binance-clone-script");
});
router.get("/metaverse-dating-apps", function (req, res, next) {
  res.redirect(301, "/metaverse-dating-app");
});
router.get("/opensea-clone-scrip", function (req, res, next) {
  res.redirect(301, "/opensea-clone-script");
});
router.get("/blog/how-to-create-bep-20-token", function (req, res, next) {
  res.redirect(301, "/how-to-create-bep-20-token");
});
router.get(
  "/blog/category/blog/how-to-create-bep-20-token",
  function (req, res, next) {
    res.redirect(301, "/how-to-create-bep-20-token");
  },
);
router.get(
  "/tips-to make-a-profit-by-crypto-futures-trading-in-2022",
  function (req, res, next) {
    res.redirect(
      301,
      "/tips-to-make-a-profit-by-crypto-futures-trading-in-2022",
    );
  },
);
router.get(
  "/tips-to%20make-a-profit-by-crypto-futures-trading-in-2022",
  function (req, res, next) {
    res.redirect(
      301,
      "/tips-to-make-a-profit-by-crypto-futures-trading-in-2022",
    );
  },
);
router.get("/our-services", function (req, res, next) {
  res.redirect(301, "/");
});
router.get(
  "/metaverse-nft-marketplace-developmentBusiness",
  function (req, res, next) {
    res.redirect(301, "/metaverse-nft-marketplace-development");
  },
);
router.get("/webmobile", function (req, res, next) {
  res.redirect(301, "/web-app-development-services");
});
router.get("/metaverse-development", function (req, res, next) {
  res.redirect(301, "/metaverse-development-company");
});
router.get("/white-name", function (req, res, next) {
  res.redirect(301, "/");
});
router.get(
  "/plung-1trillion-market-binance-clone-script",
  function (req, res, next) {
    res.redirect(301, "/plunge-into-trillion-market-binance-exchange");
  },
);
router.get("/partnering-with-clarisco/", function (req, res, next) {
  res.redirect(301, "/become-our-partner");
});
router.get(
  "/blog/how-blockchain-facilitates-kyc-and-aml-processes",
  function (req, res, next) {
    res.redirect(301, "/how-blockchain-facilitates-kyc-and-aml-processes");
  },
);
router.get("/metaverse", function (req, res, next) {
  res.redirect(301, "/metaverse-development-company");
});
router.get(
  "/how-to-launch-p2p-exchange-like-paxful",
  function (req, res, next) {
    res.redirect(301, "/paxful-clone-script");
  },
);
router.get("/blog/stablecoins", function (req, res, next) {
  res.redirect(301, "/blog");
});
router.get("/clarisco.com/contact", function (req, res, next) {
  res.redirect(301, "/contact");
});
router.get("/clarisco.com/bakeryswap-clone-script", function (req, res, next) {
  res.redirect(301, "/bakeryswap-clone-script");
});
router.get("/clarisco.com/justswap-clone-script", function (req, res, next) {
  res.redirect(301, "/justswap-clone-script");
});
router.get("/clarisco.com/sushiswap-clone-script", function (req, res, next) {
  res.redirect(301, "/sushiswap-clone-script");
});
router.get("/internet-of-things-services", function (req, res, next) {
  res.redirect(301, "/iot");
});
router.get("/terms-and-condtions", function (req, res, next) {
  res.redirect(301, "/terms-conditions");
});
router.get("/new_contact_submit", function (req, res, next) {
  res.redirect(301, "/contact");
});
router.get(
  "/security-token-exchange-development-company",
  function (req, res, next) {
    res.redirect(301, "/sto-exchanges");
  },
);
router.get("/home-page", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/contact_submit", function (req, res, next) {
  res.redirect(301, "/contact");
});
router.get(
  "/blockchain-smartcontract-application-development",
  function (req, res, next) {
    res.redirect(301, "/smart-contract-development");
  },
);
router.get(
  "/cryptocurrency-exchange-development-company",
  function (req, res, next) {
    res.redirect(301, "/cryptocurrency-exchange-development");
  },
);
router.get(
  "/security-token-offering-development-company",
  function (req, res, next) {
    res.redirect(301, "/sto-development");
  },
);
router.get("/nft-marketplace-development-services", function (req, res, next) {
  res.redirect(301, "/nft-marketplace-development");
});
router.get(
  "/cryptocurrency-development-services-company",
  function (req, res, next) {
    res.redirect(301, "/cryptocurrency-development");
  },
);
router.get("/blog/metaverse", function (req, res, next) {
  res.redirect(301, "/blog/category/metaverse");
});
router.get("/mailing-tool", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/token-development-like-bep-20", function (req, res, next) {
  res.redirect(301, "/bep20-token-development");
});
router.get("/cryptocurrency-exchange-s", function (req, res, next) {
  res.redirect(301, "/cryptocurrency-exchange-development");
});
router.get("/defi-developm", function (req, res, next) {
  res.redirect(301, "/defi-development-company");
});
router.get("/metaverse-nft-marketplace-de", function (req, res, next) {
  res.redirect(301, "/metaverse-nft-marketplace-development");
});
router.get("/metaverse-nft-marketplace-dev", function (req, res, next) {
  res.redirect(301, "/metaverse-nft-marketplace-development");
});
router.get("/pancakeswap-like-dex-development", function (req, res, next) {
  res.redirect(301, "/pancakeswap-clone-script");
});
router.get("/white-label-nft-marketplace-develop", function (req, res, next) {
  res.redirect(301, "/white-label-nft-marketplace-development");
});
router.get("/nft-marketplace-", function (req, res, next) {
  res.redirect(301, "/nft-marketplace-development");
});
router.get("/blogs", function (req, res, next) {
  res.redirect(301, "/blog");
});
router.get(
  "/deFi-smart-contract-development-services",
  function (req, res, next) {
    res.redirect(301, "/defi-smart-contract-development-company");
  },
);
router.get("/nft-lending-platform-developmen", function (req, res, next) {
  res.redirect(301, "/nft-lending-platform-development");
});
router.get("/nft-marketplace", function (req, res, next) {
  res.redirect(301, "/nft-marketplace-development");
});
router.get(
  "/blog/category/blog/crypto-trading-strategies-to-profit-crypto-markets",
  function (req, res, next) {
    res.redirect(
      301,
      "/blog/crypto-trading-strategies-to-profit-crypto-markets",
    );
  },
);
router.get(
  "/blog/category/blog/how-to-create-p2p-lending-platform",
  function (req, res, next) {
    res.redirect(301, "/blog/how-to-create-p2p-lending-platform");
  },
);
router.get(
  "/blog/category/blog/how-to-get-cryptocurrency-exchange-license-in-india",
  function (req, res, next) {
    res.redirect(
      301,
      "/blog/how-to-get-cryptocurrency-exchange-license-in-india",
    );
  },
);
router.get(
  "/blog/how-to-get-cryptocurrency-exchange-license-in-india",
  function (req, res, next) {
    res.redirect(301, "/how-to-get-cryptocurrency-exchange-license-in-india");
  },
);
router.get("/token-development-company”", function (req, res, next) {
  res.redirect(301, "/token-development-company");
});
router.get("/trust-wallet-clone", function (req, res, next) {
  res.redirect(301, "/trust-wallet-clone-script-development");
});

router.get(
  "/crypto-arbitrage-bot-development-company",
  function (req, res, next) {
    res.redirect(301, "/crypto-arbitrage-bot-development-company");
  },
);
router.get("/paxful-clone-scriptReady", function (req, res, next) {
  res.redirect(301, "/paxful-clone-script");
});
router.get("/crypto-market-making-bot-development", function (req, res, next) {
  res.redirect(301, "/crypto-market-making-bot-development");
});
router.get("/centralized-crypto-exchan", function (req, res, next) {
  res.redirect(301, "/centralized-crypto-exchange-development");
});
router.get("/white-label-nft-marketpla", function (req, res, next) {
  res.redirect(301, "/white-label-nft-marketplace-development");
});
router.get("/white-label-crypto-exchangeReady", function (req, res, next) {
  res.redirect(301, "/white-label-crypto-exchange");
});
router.get("/crypto-licence-czech-", function (req, res, next) {
  res.redirect(301, "/crypto-licence-czech-republic");
});
router.get("/crypto-licence-czech-", function (req, res, next) {
  res.redirect(301, "/crypto-licence-czech-republic");
});
router.get(
  "/explore-crypto-arbitrage-trading-bot-develeopment",
  function (req, res, next) {
    res.redirect(301, "/explore-crypto-arbitrage-trading-bot-development");
  },
);
router.get(
  "/explore-crypto-arbitrage-trading-bot-develeopment",
  function (req, res, next) {
    res.redirect(301, "/explore-crypto-arbitrage-trading-bot-development");
  },
);
router.get("/white", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/metaverse-nft-marketplace-developmen", function (req, res, next) {
  res.redirect(301, "/metaverse-nft-marketplace-development");
});
router.get("/trust-wallet-clone-script", function (req, res, next) {
  res.redirect(301, "/trust-wallet-clone-script-development");
});
router.get("/paxful-clone-sc", function (req, res, next) {
  res.redirect(301, "/paxful-clone-script");
});
router.get(
  "/blog/how-to-get-cryptocurrency-exchange-license-in-india/",
  function (req, res, next) {
    res.redirect(301, "/how-to-get-cryptocurrency-exchange-license-in-india");
  },
);
// router.get("/erc20-token-development", function (req, res, next) {
//   res.redirect(301, "/erc20-token-development");
// });
// router.get("/bep20-token-development", function (req, res, next) {
//   res.redirect(301, "/bep20-token-development");
// });
router.get("/asxsc", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/scasdc", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/sadasd", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/Link", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/AXADS", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/xdasdas", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/adsad", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/sadxasd", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/asdsad", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/asdas", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/dxas", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/ASXDXASD", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/defi-", function (req, res, next) {
  res.redirect(301, "/");
});

router.get(
  "/cryptocurrency-exchange-scriptWhatsapp",
  function (req, res, next) {
    res.redirect(301, "/cryptocurrency-exchange-script");
  },
);
router.get("/product-category/clothing/hoodies/", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/defi-token-", function (req, res, next) {
  res.redirect(301, "/defi-token-development-services-company");
});
router.get("/product/beanie/", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/p2p-cryptocurrency-exchange-", function (req, res, next) {
  res.redirect(301, "/p2p-cryptocurrency-exchange-development");
});
router.get("/cryptocurrency-exchange-developmentIf", function (req, res, next) {
  res.redirect(301, "/cryptocurrency-exchange-development");
});
router.get("/cryptocurrency-exchange-developmentTo", function (req, res, next) {
  res.redirect(301, "/cryptocurrency-exchange-development");
});
router.get("/metaverse-", function (req, res, next) {
  res.redirect(301, "/metaverse-development-company");
});
//
router.get("/d-ecosystem-blockchain-explorer", function (req, res, next) {
  res.redirect(301, "/d-ecosystem");
});

router.get("/pdf-form", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/blog-form", function (req, res, next) {
  res.redirect(301, "/");
});

router.get("/metaverse-nft-marketplace-developmXXX", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/portf", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/p2p-", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/category/news", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/category/news/", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/product/belt", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/product/belt/", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/tag/responsive", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/tag/responsive/", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/token-coin-dev", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/clarisco", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/\\[color=red", function (req, res, next) {
  res.redirect(301, "/");
});
// router.get("/[color=red", function (req, res, next) {
//   res.redirect(301, "/");
// });
router.get("/blockchain", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/nft-", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/team/betty-cordeiro", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/team/betty-cordeiro/", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/team/terrell-artis", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/team/terrell-artis/", function (req, res, next) {
  res.redirect(301, "/");
});
router.get(
  "/artificial-intelligence-services-in-india",
  function (req, res, next) {
    res.redirect(301, "/best-ai-development-companies");
  },
);
router.get(
  "/best-ai-development-companies",
  function (req, res, next) {
    res.redirect(301, "/ai-development-company");
  },
);
router.get("/cryptocurrency-exchange-scriptIf", function (req, res, next) {
  res.redirect(301, "/cryptocurrency-exchange-script");
});
router.get("/tag/features", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/team/sarah-killy", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/product/hoodie-with-zipper", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/portfol", function (req, res, next) {
  res.redirect(301, "/");
  //
});
router.get("/author/admin", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/ico-platform", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/tag/revenue-cycle-management", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/product/t-shirt-with-logo", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/nft-marketplace-development/1000", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/metamask-wallet-clone-script/1000", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/d", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/dashboard", function (req, res, next) {
  res.redirect(301, "/");
});

router.get(
  "/blog/category/how-blockchain-could-be-efficient-in-the-insurance-sector",
  function (req, res, next) {
    res.redirect(
      301,
      "/must-known-factors-for-starting-white-label-crypto-exchange",
    );
  },
);
router.get(
  "/blog/category/methods-for-improving-user-experience",
  function (req, res, next) {
    res.redirect(301, "/methods-for-improving-user-experience");
  },
);
router.get(
  "/blog/category/build-crypto-exchange-platform-with-mean-stack",
  function (req, res, next) {
    res.redirect(301, "/build-crypto-exchange-platform-with-mean-stack");
  },
);
router.get(
  "/blog/category/build-crypto-exchange-platform-with-mern-stack",
  function (req, res, next) {
    res.redirect(301, "/build-crypto-exchange-platform-with-mern-stack");
  },
);
router.get(
  "/blog/category/how-blockchain-could-be-efficient-in-the-insurance-sector",
  function (req, res, next) {
    res.redirect(
      301,
      "/how-blockchain-could-be-efficient-in-the-insurance-sector",
    );
  },
);

router.get("/pm.clarisco.com", function (req, res, next) {
  res.redirect(301, "/");
});

router.get(
  "/fractional-nft-marketplace-development/1000",
  function (req, res, next) {
    res.redirect(301, "/");
  },
);
router.get("/top-5-defi-projects-2023/1000", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/company_login", function (req, res, next) {
  res.redirect(301, "/");
});
router.get(
  "/c94q3iaf/usdt-contract-address-metamask",
  function (req, res, next) {
    res.redirect(301, "/");
  },
);
router.get("/win", function (req, res, next) {
  res.redirect(301, "/");
});
router.get(
  "/clarisco_images/nft/market-places/nft-marketplace-like-opensea/nft-marketplace-token-development-1.webp",
  function (req, res, next) {
    res.redirect(301, "/");
  },
);
router.get(
  "/blog/category/metaverse-ecommerce-store-development",
  function (req, res, next) {
    res.redirect(301, "/");
  },
);
router.get("/product/logo-collection/feed", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/blog-3", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/team-category/web-developer/feed", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/login", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/terms", function (req, res, next) {
  res.redirect(301, "/");
});
router.get(
  "/blog/category/10-ways-to-use-binance-coin-bnb",
  function (req, res, next) {
    res.redirect(301, "/");
  },
);

router.get("/product-category/clothing/tshirts", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/product/hoodie-with-logo", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/tag/news", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/team/patsy-poe", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/product-category/uncategorized", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/team/william-allingham", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/product/hoodie", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/christmas_contact_submit", function (req, res, next) {
  res.redirect(301, "/");
});
router.get(
  "/blog/category/Crypto%20Exchange%20Script",
  function (req, res, next) {
    res.redirect(301, "/");
  },
);
router.get("/defi-development-comp", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/href=", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/product/beanie-with-logo", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/demo_contact_submit", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/product/polo", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/product/cap", function (req, res, next) {
  res.redirect(301, "/");
});

router.get("/blockchain-development", function (req, res, next) {
  res.redirect(301, "/blockchain-development-company");
});

router.get("/blockchain-development-co", function (req, res, next) {
  res.redirect(301, "/blockchain-development-company");
});

router.get("/blockchain-development-company", async function (req, res) {
  const path = req.path.split("/");

  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blockchain/Blockchaindevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/blockchain-game-development", async function (req, res) {
  const path = req.path.split("/");

  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blockchain/Blockchaingamedevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get(
  "/blockchain-payment-remittance-platform",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("Blockchain/Blockchainpaymentremittanceplatform.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);
router.get("/dapps-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blockchain/Dappsdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/directed-acyclic-graph", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blockchain/Directedacyclicgraph.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/iot-energy-meter-solution", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blockchain/Iotenergymetersolution.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/iot-solution-for-industry", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blockchain/Iotsolutionforindustry.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/iot-telematic-devices", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blockchain/Iottelematicdevices.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/poc-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blockchain/Pocdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/polkadot-dapps-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blockchain/Polkadotdappsdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/polkadot-wallet-development-services", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blockchain/Polkadotwalletdevelopmentservices.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/private-blockchain-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blockchain/Privateblockchaindevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/quorum-explorer", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blockchain/Quorumexplorer.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/smart-contract-audit", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blockchain/Smartcontractaudit.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/smart-contract-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blockchain/Smartcontractdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/smart-home-app-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blockchain/Smarthomeappdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/smart-home-solutions", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blockchain/Smarthomesolutions.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/smart-poles-solution", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blockchain/Smartpolessolution.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/sports-betting-dapp", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blockchain/Sportsbettingdapp.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get(
  "/steller-remittance-platform-development",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("Blockchain/Stellarremittanceplatformdevelopment.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);
router.get("/tron-dapps-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blockchain/Trondappsdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/event", function (req, res, next) {
  res.redirect(301, "/events");
});
router.get("/events", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blog/Event.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/about-us", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
      Blogdata: function (cb) {
        blogs.find({}).limit(12).sort({ _id: -1 }).exec(cb);
      },
    },
    function (err, results) {
      try {
        if (results.cmsdata) {
          res.render("Blog/Aboutus.ejs", {
            metadata: results.cmsdata,
            blogdata: results.Blogdata,
          });
        } else {
          res
            .status(404)
            .render("common/404", { title: " Sorry, page not found" });
        }
        //res.render("Blog/Aboutus.ejs", { metadata: results.cmsdata , blogdata: Blogdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

// <===================>
router.get("/case-studies", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blog/case-studies.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
// <=================>
// <===================>
router.get("/play-to-earn-game-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("playgame/play-to-earn-game-development.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
// <=================>

router.get("/become-our-partner", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blog/Becomeourpartner.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/blogs", function (req, res, next) {
  res.redirect(301, "/blog");
});

router.get("/blog", async function (req, res) {
  const path = req.path.split("/");

  try {
    const cmsdata = await pages.findOne({ page_link: path[1] }).exec();
    const blogscategorydata = await blog_category
      .find({})
      .sort({ _id: -1 })
      .exec();
    const blogsdata = await blogs.find({}).limit(9).sort({ _id: -1 }).exec();

    if (blogsdata && blogscategorydata) {
      res.render("Blog/Blog.ejs", {
        blogdata: blogsdata,
        blogcategory: blogscategorydata,
        metadata: cmsdata,
      });
    } else {
      res.status(404).render("common/404", { title: " Sorry, page not found" });
    }
  } catch (err) {
    // Handle errors appropriately
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/blog-pagination", async function (req, res) {
  const limit = req.query.limit; // Number of items per page
  const offset = req.query.offset; // Starting index of the page, e.g., for page 2, offset = (page_number - 1) * limit

  try {
    const blogsdata = await blogs
      .find({})
      .sort({ _id: -1 })
      .skip(offset)
      .limit(limit)
      .exec();

    const count = await blogs.countDocuments();

    if (blogsdata && count) {
      res.json({ blogsdata, count });
      //     res.render("Blog/Blog.ejs", { "blogdata": blogsdata});
    } else {
      res.status(404).render("common/404", { title: " Sorry, page not found" });
    }
  } catch (err) {
    // Handle errors appropriately
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/blog-category-pagination", async function (req, res) {
  const limit = req.query.limit; // Number of items per page
  const offset = req.query.offset; // Starting index of the page, e.g., for page 2, offset = (page_number - 1) * limit
  const category = req.query.category;
  console.log(category, "category");
  try {
    const blogcategorydata = await blog_category
      .findOne({ blog_category_link: category })
      .sort({ _id: -1 })
      .exec();

    const blogsdata = await blogs
      .find({ blog_category: blogcategorydata.blog_category })
      .sort({ _id: -1 })
      .skip(offset)
      .limit(limit)
      .exec();

    const count = await blogs.countDocuments({
      blog_category: blogcategorydata.blog_category,
    });
    console.log(count);
    if (blogsdata && count) {
      res.json({ blogsdata, count });
      //     res.render("Blog/Blog.ejs", { "blogdata": blogsdata});
    }
  } catch (err) {
    // Handle errors appropriately
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/blog-category/data/:link", async function (req, res) {
  async.parallel(
    {
      cmsdata: function (cb) {
        blog_category
          .find({ blog_category_link: req.params.link })
          .sort({ _id: -1 })
          .exec(cb);
      },
    },
    function (err, results) {
      try {
        res.json(results.cmsdata);
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/blog/category/:link", async function (req, res) {
  const OGUrl = decodeURIComponent(req.url);
  const Regex = /[^a-zA-Z0-9-]/;
  const url = OGUrl.split("/")[3];
  if (!Regex.test(url)) {
    async.parallel(
      {
        cmsdata: function (cb) {
          blog_category
            .find({ blog_category_link: req.params.link })
            .sort({ _id: -1 })
            .exec(cb);
        },
      },
      function (err, results) {
        console.log("results", results);
        try {
          const data = results.cmsdata;
          if (data[0] != undefined) {
            async.parallel(
              {
                cmsdata: function (cb) {
                  blog_category
                    .findOne({ blog_category_link: req.params.link })
                    .sort({ _id: -1 })
                    .exec(cb);
                },
                blogscategorydata: function (cb) {
                  blog_category.find({}).sort({ _id: -1 }).exec(cb);
                },
                blogsdata: function (cb) {
                  blogs
                    .find({ blog_category: data[0].blog_category })
                    .limit(9)
                    .sort({ _id: -1 })
                    .exec(cb);
                },
              },
              function (err, results) {
                try {
                  if (results.blogsdata && results.blogscategorydata) {
                    var data = results.blogsdata;
                    var blogcategory = results.blogscategorydata;
                    var metadata = results.cmsdata;
                    console.log(metadata, "metadata");
                    res.render("Blog/Blog-catogries.ejs", {
                      blogdata: data,
                      blogcategory: blogcategory,
                      metadata: metadata,
                    });
                  } else {
                    res.status(404).render("common/404", {
                      title: " Sorry, page not found",
                    });
                  }
                } catch (err) {
                  return callback(new Error("Error"));
                }
              },
            );
          } else {
            res
              .status(404)
              .render("common/404", { title: " Sorry, page not found" });
          }
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  } else {
    let cleanedUrl = url.replace(/[^a-zA-Z0-9- ]/g, "");
    cleanedUrl = cleanedUrl.replace(" ", "-");
    const correctionUrl = `/${cleanedUrl}`;
    res.status(301).redirect(`/blog/category${correctionUrl}`);
  }
});

router.get("/career", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blog/Career.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/privacy-policy", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blog/Privacypolicy.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/readmore", async function (req, res) {
  const path = req.path.split("/");
  res.render("Blog/Readmore.ejs", { metadata: results.cmsdata, url: req.url });
});

router.get("/team", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blog/Team.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/terms-conditions", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Blog/Termscondition.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/binance-smart-Chain", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Bsc/Binancesmartchain.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/smart-contract-mlm-on-bsc", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Bsc/Smartcontractmlmonbsc.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/bep20-token-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Bsc/Tokendevelopmentlikebep20.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/binance-clone-script", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Clonescript/Binanceclonescript.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/blockchain-dapps-games-clone", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Clonescript/Blockchaindappsgamesclone.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/clone-scripts", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Clonescript/Clonescript.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/coinbase-clone-script", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Clonescript/CoinbaseCloneScript.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/cryptocurrency-exchange-clone", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Clonescript/Cryptocurrencyexchangeclone.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/cryptocurrency-hyip-clone", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Clonescript/Cryptocurrencyhyipclone.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/cryptocurrency-mlm-clone", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Clonescript/Cryptocurrencymlmclone.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/defi-clone", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Clonescript/Deficlone.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/demanding-clone", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Clonescript/Demandingclone.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/metamask-wallet-clone-script", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Clonescript/Metamaskwalletclonescript.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/nft-clone", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Clonescript/Nftclone.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/paxful-clone-script", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Clonescript/PaxfulCloneScript.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/remitano-clone-script", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Clonescript/Remitanoclonescript.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/WazirX-clone-script", function (req, res, next) {
  res.redirect(301, "/wazirx-clone-script");
});

router.get("/wazirx-clone-script", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Clonescript/Wazirxclonescript.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/contact", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Contact/Contact.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/contact-us", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Contact/Contactus.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/thankyou", function (req, res) {
  res.render("Contact/Thankyou.ejs");
});

router.get("/bitcoin-mining-software", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Cryptocurrency/Bitcoinminingsoftware.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/cryptocurrency-atm-software", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Cryptocurrency/Cryptocurrencyatmsoftware.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/cryptocurrency-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Cryptocurrency/Cryptocurrencydevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/cryptocurrency-litigation-services", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Cryptocurrency/Cryptocurrencylitigationservices.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/cryptocurrency-mlm-software", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Cryptocurrency/Cryptocurrencymlmsoftware.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/crypto-payment-development", function (req, res, next) {
  res.redirect(301, "/cryptocurrency-payment-gateway-development");
});
router.get(
  "/cryptocurrency-payment-gateway-development",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("Cryptocurrency/Cryptopaymentdevelopment.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);
router.get("/decentralized-stablecoin-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Cryptocurrency/Decentralizedstablecoindevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/exchange-listing-services", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Cryptocurrency/Exchangelistingservices.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/local-bitcoin-clone", function (req, res, next) {
  res.redirect(301, "/localbitcoins-clone-script");
});
router.get("/localbitcoins-clone-script", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Cryptocurrency/Localbitcoinclone.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/masternode-coin-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Cryptocurrency/Masternodecoindevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/safemoon-like-token-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Cryptocurrency/Safemoonliketokendevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/stable-coin-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Cryptocurrency/Stablecoindevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/wallet-development", function (req, res, next) {
  res.redirect(301, "/cryptocurrency-wallet-development-company");
});

router.get(
  "/cryptocurrency-wallet-development-company",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("Cryptocurrency/Walletdevelopment.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);

router.get("/decentralized-exchange-like-1inch", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Dft/Decentralizedexchangelike1inch.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/decentralized-exchange-like-uniswap", function (req, res, next) {
  res.redirect(301, "/uniswap-clone-script");
});
router.get("/uniswap-clone-script", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Dft/Decentralizedexchangelikeuniswap.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/decentralized-finance-development", function (req, res, next) {
  res.redirect(301, "/defi-development-company");
});
router.get("/defi-development-company", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Dft/Decentralizedfinancedevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/defi-application-development-services", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Dft/Defiapplicationdevelopmentservices.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/defi-crowdfunding-platform", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Dft/Deficrowdfundingplatform.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/defi-exchange-development-solution", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Dft/Defiexchangedevelopmentsolution.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/defi-ico-development-company", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Dft/Defiicodevelopmentcompany.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get(
  "/defi-insurance-platform-development-services",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("Dft/Defiinsuranceplatformdevelopmentservices.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);

router.get("/defi-lending-borrowing-platform", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Dft/Defilendingborrowingplatform.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/deFi-lending-borrowing-platform", async function (req, res, next) {
  res.redirect(301, "/defi-lending-borrowing-platform");
});

router.get(
  "/defi-lending-borrowing-protocol-like-aave",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("Dft/Defilendingborrowingprotocollikeaave.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);
router.get("/defi-marketing-services", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Dft/Defimarketingservices.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get(
  "/defi-protocol-development-like-yearn-finance",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("Dft/Defiprotocoldevelopmentlikeyearnfinance.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);
router.get(
  "/defi-Protocol-development-like-yearn-finance",
  function (req, res, next) {
    res.redirect(301, "/defi-protocol-development-like-yearn-finance");
  },
);
router.get("/defi-real-estate-platform", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Dft/Defirealestateplatform.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get(
  "/defi-smart-contract-development-services",
  function (req, res, next) {
    res.redirect(301, "/defi-smart-contract-development-company");
  },
);
router.get(
  "/defi-smart-contract-development-company",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("Dft/Defismartcontractdevelopmentservices.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);
router.get("/defi-solutions-for-ecommerce", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Dft/Defisolutionsforecommerce.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/defi-staking-platform-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Dft/Defistakingplatformdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/deFi-staking-platform-development", async function (req, res) {
  res.redirect(301, "/defi-staking-platform-development");
});

router.get("/defi-synthetic-assets-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Dft/Defisyntheticassetsdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get(
  "/defi-token-development-services-company",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("Dft/Defitokendevelopmentservicescompany.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);
router.get("/defi-tokenization-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Dft/Defitokenizationdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/defi-wallet-development-solution", function (req, res, next) {
  res.redirect(301, "/defi-wallet-development-company");
});

router.get("/defi-wallet-development-company", async function (req, res) {
  //console.log('result -----------',res);
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Dft/Defiwalletdevelopmentsolution.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/deFi-yield-farming-development", function (req, res, next) {
  res.redirect(301, "/defi-yield-farming-development");
});

router.get("/defi-yield-farming-development", async function (req, res) {
  const path = req.path.split("/");
  console.log(path, "path");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      console.log(results, "result");
      try {
        res.render("Dft/Defiyieldfarmingdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/pancakeSwap-like-dex-development", function (req, res, next) {
  res.redirect(301, "/pancakeswap-clone-script");
});

router.get("/ancakeswap-clone-script", function (req, res, next) {
  res.redirect(301, "/pancakeswap-clone-script");
});

router.get("/pancakeswap-clone-script", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Dft/Pancakeswaplikedexdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/sushiswap-clone-script", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Dft/SushiswapCloneScript.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/whitelabel-swap-exchange-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Dft/Whitelabelswapexchangedevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/blockchain-consulting", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Enterprise/Blockchainconsulting.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/corda-blockchain-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Enterprise/Cordablockchaindevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/eos-blockchain-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Enterprise/Eosblockchaindevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/ethereum-smart-contract-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Enterprise/Ethereumsmartcontractdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/ethereum-token-development", function (req, res, next) {
  res.redirect(301, "/erc20-token-development");
});
router.get("/erc20-token-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Enterprise/Ethereumtokendevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/hasgraph-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Enterprise/Hasgraphdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/hedera-hasgraph-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Enterprise/Hederahasagraphdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/hyfi-blockchain-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Enterprise/Hyfiblockchainconsulting.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/hyperledger-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Enterprise/Hyperledgerdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/iot-fleet-management", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Enterprise/Iotfleetmanagement.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/kusama-blockchain-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Enterprise/Kusamablockchaindevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/multichain-blockchain-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Enterprise/Multichainblockchaindevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/polkadot-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Enterprise/Polkatdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/quorum-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Enterprise/Quorumdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/salesforce-blockchain-developement", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Enterprise/Salesforceblockchaindevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/solidity-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Enterprise/Soliditydevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/stellar-blockchain-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Enterprise/Stellarblockchaindevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/tezos-dapp-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Enterprise/Tezosdappdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/cryptocurrency-exchange-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).lean().exec(cb);
      },
      blogsdata: function (cb) {
          blogs
            .find({ blog_category: "Crypto Exchange Script" })
            .select("blog_title blog_link blogimg blog_category date blog_meta_description")
            .limit(3)
            .sort({ _id: -1 })
            .lean()
            .exec(cb);
        },
    },
    function (err, results) {
      try {
        res.render("Exchange/Cryptocurrencyexchangedevelopment.ejs", {
          metadata: results.cmsdata,
          blogsdata: results.blogsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/cryptocurrency-exchange-legal", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Exchange/Cryptocurrencyexchangelegal.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/cryptocurrency-exchange-marketing", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Exchange/Cryptocurrencyexchangemarketing.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/cryptocurrency-exchange-script", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Exchange/Cryptocurrencyexchangescript.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/crypto-exchange-algo-trading", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Exchange/Cryptoexchangealgotrading.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/decentralized-exchange-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Exchange/Decentralizedexchange.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get(
  "/hybrid-cryptocurrency-exchange-development",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("Exchange/Hybridcrytocurrencyexchangedevelopment.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);
router.get("/p2p-exchange-development", function (req, res, next) {
  res.redirect(301, "/p2p-cryptocurrency-exchange-software-development");
});
router.get(
  "/p2p-cryptocurrency-exchange-software-development",
  function (req, res, next) {
    res.redirect(301, "/p2p-cryptocurrency-exchange-development");
  },
);

router.get("/white-label-crypto-exchangecryp", function (req, res, next) {
  res.redirect(301, "/white-label-crypto-exchange");
});
router.get("/white-label-crypto-exchan", function (req, res, next) {
  res.redirect(301, "/white-label-crypto-exchange");
});

router.get(
  "/p2p-cryptocurrency-exchange-development",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("Exchange/P2pexchangedevelopment.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);
router.get("/white-label-crypto-exchange", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).lean().exec(cb);
      },
        blogsdata: function (cb) {
          blogs
            .find({ blog_category: "White Label Crypto Exchange" })
            .select("blog_title blog_link blogimg blog_category date blog_meta_description")
            .limit(3)
            .sort({ _id: -1 })
            .lean()
            .exec(cb);
        },
    },
    function (err, results) {
      try {
        res.render("Exchange/Whitelabelcryptoexchange.ejs", {
          metadata: results.cmsdata,
            blogsdata: results.blogsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get(
  "/cryptocurrency-exchange-license-offering",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("Exchange/CryptocurrencyExchangeLicenseOffering.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);
router.get("/hire-developers", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Hire/Hire.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
// <=================>
router.get(
  "/our-talent-acquisition-and-staffing-services",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("Hire/Ourtalent.ejs", { metadata: results.cmsdata });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);
// <===================>
router.get("/ico-bountry-marketing", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Ico/Icobountrymarketing.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/ico-community-marketing", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Ico/Icocommunitymarketing.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/ico-development", function (req, res, next) {
  res.redirect(301, "/ico-script-software");
});
router.get("/ico-script-software", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Ico/Icodevelopment.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/ico-influencer-marketing", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Ico/Icoinfluencermarketing.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/ico-marketing", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Ico/Icomarketing.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/ico-marketing-guide", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Ico/Icomarketingguide.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/ico-telegram-marketing", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Ico/Icotelegrammarketing.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/ico-website-design", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Ico/Icowebsitedesign.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/ico-youtube-influencer-marketing", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Ico/Icoyoutubeinfluencermarketing.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/ieo-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Ico/Ieodevelopment.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/listing-services", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Ico/listingservices.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/orm-services", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Ico/Ormservices.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get(
  "/fundraising-platform-like-polkastarter",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("Ido/Fundraisingplatformlikepolkastarter.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);
router.get("/ido-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Ido/Idodevelopment.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/ido-marketing", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Ido/Idomarketing.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/ido-token-launch-pad", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Ido/Idotokenlaunchpad.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/ifo-development-services", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Ifo/Ifodevelopmentservices.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/iio-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Iio/Iiodevelopment.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/ilo-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Ilo/Ilodevelopment.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/blockchain-for-cybersecurity", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Industries/Blockchainforcybersecurity.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/industries", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Industries/Industries.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/blockchain-for-finance", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Industries/Blockchainfornfinance.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/blockchain-for-pharma-industry", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Industries/Blockchainforpharmaindustry.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/blockchain-iot-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Industries/Blockchainiotdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/emr-and-ehr-software-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Industries/Emrandehrsoftwaredevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/p2p-lending-software", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Industries/P2plendingsoftware.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/supply-chain-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Industries/Supplychaindevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get(
  "/white-label-crypto-launchpad-development-company",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("Launchpad/Launchpaddevelopmentservices.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);

router.get("/launchpad-development-services", function (req, res, next) {
  res.redirect(301, "/white-label-crypto-launchpad-development-company");
});
/*WEBAPP*/

router.get("/ai", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/Artificialintelligance.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/ai-development-company", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).lean().exec(cb);
      },
      blogsdata: function (cb) {
        blogs
          .find({ blog_category: "Artificial Intelligence" })
          .select("blog_title blog_link blogimg blog_category date blog_meta_description")
          .limit(3)
          .sort({ _id: -1 })
          .lean()
          .exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/ai-development.ejs", {
          metadata: results.cmsdata,
          blogsdata: results.blogsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/iot", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/Internetofthings.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/webapp", function (req, res, next) {
  res.redirect(301, "/web-app-development-services");
});

router.get("/web-app-development-services", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/Webapp.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/ai-as-a-service-company", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/AIasService.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/enterprise-ai-development-company", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/EnterpriseAI.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/ai-chatbot-development-company", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/AIChatbot.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/hire-ai-developers", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/HireAIDev.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/ai-ml-development-company", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/AIMLDev.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get(
  "/ai-ecommerce-platform-development-company",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("Webapp/aiecommerceplat.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);
router.get("/ai-powered-app-development-company", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/aipoweredapp.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/generative-ai-development-company", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/generativeaidev.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/generative-ai-consulting-services", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/Generativeaiconsulting.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/ai-agent-development-company", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/ai-agent-development-company.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/ai-copilot-development-company", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/ai-copilot-development-company.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/adaptive-ai-development-company", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/adaptive-ai-development-company.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/ai-powered-banking-solutions", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/ai-powered-banking-solutions.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/ai-powered-education-solutions", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/ai-powered-education-solutions.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/ai-powered-cybersecurity-solutions", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/ai-powered-cybersecurity-solutions.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/ai-powered-customer-service-solutions", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/ai-powered-customer-service-solutions.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/ai-in-media-and-entertainment", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/ai-in-media-and-entertainment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/ai-in-automotive-industry", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/ai-in-automotive-industry.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/predictive-ai-development-company", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/predictive-ai-development-company.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/conversational-ai-development-company", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/conversational-ai-development-company.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/polymarket-clone-script", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).lean().exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/polymarket-clone-script.ejs", {
          metadata: results.cmsdata,
          needsSwiper: false,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/kalshi-clone-script", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).lean().exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Webapp/kalshi-clone-script.ejs", {
          metadata: results.cmsdata,
          needsSwiper: false,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
/*Tokenizationplatform*/

router.get("/art-tokenization", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Tokenizationplatform/Arttokenization.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/tokenization-platform", function (req, res, next) {
  res.redirect(301, "/asset-tokenization-development-company");
});

router.get(
  "/asset-tokenization-development-company",
  async function (req, res) {
    const path = req.path.split("/");
    cachedParallel(
      path[1],
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).lean().exec(cb);
        },
        blogsdata: function (cb) {
          blogs
            .find({ blog_category: "Tokenization" })
            .select("blog_title blog_link blogimg blog_category date blog_meta_description")
            .limit(3)
            .sort({ _id: -1 })
            .lean()
            .exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("Tokenizationplatform/Tokenizationplatform.ejs", {
            metadata: results.cmsdata,
            blogsdata: results.blogsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);
router.get(
  "/carbon-credits-tokenization-development",
  async function (req, res) {
    const path = req.path.split("/");
    cachedParallel(
      path[1],
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).lean().exec(cb);
        },
        blogsdata: function (cb) {
          blogs
            .find({ blog_category: "Tokenization" })
            .select("blog_title blog_link blogimg blog_category date blog_meta_description")
            .limit(3)
            .sort({ _id: -1 })
            .lean()
            .exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("Tokenizationplatform/CarbonCreditsTokenization.ejs", {
            metadata: results.cmsdata,
            blogsdata: results.blogsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);

router.get("/tokenized-asset-offering", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Tokenizationplatform/Tokenizedassetoffering.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/gold-tokenization-development-company", async function (req, res) {
  const path = req.path.split("/");
  cachedParallel(
    path[1],
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).lean().exec(cb);
      },
      blogsdata: function (cb) {
        blogs
          .find({ blog_category: "Tokenization" })
          .select("blog_title blog_link blogimg blog_category date blog_meta_description")
          .limit(3)
          .sort({ _id: -1 })
          .lean()
          .exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Tokenizationplatform/Goldtokenization.ejs", {
          metadata: results.cmsdata,
          blogsdata: results.blogsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/rwa-tokenization-platform-development", async function (req, res) {
  const path = req.path.split("/");
  cachedParallel(
    path[1],
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).lean().exec(cb);
      },
      blogsdata: function (cb) {
        blogs
          .find({ blog_category: "Tokenization" })
          .select("blog_title blog_link blogimg blog_category date blog_meta_description")
          .limit(3)
          .sort({ _id: -1 })
          .lean()
          .exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render(
          "Tokenizationplatform/rwa-tokenization-platform-development.ejs",
          {
            metadata: results.cmsdata,
            blogsdata: results.blogsdata,
          },
        );
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
/*STO*/

router.get("/crowdfunding-platform", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Sto/Crowdfundingplatform.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/eto-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Sto/Etodevelopment.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});


router.get("/real-estate-tokenization", (req, res) => {
  res.redirect(301, "/real-estate-tokenization-development-company");
});


router.get("/real-estate-tokenizations", (req, res) => {
  res.redirect(301, "/real-estate-tokenization-development-company");
});


router.get("/real-estate-tokenization-platform-development", (req, res) => {
  res.redirect(301, "/real-estate-tokenization-development-company");
});

router.get("/real-estate-tokenization-platform-development-company", (req, res) => {
  res.redirect(301, "/real-estate-tokenization-development-company");
});

router.get(
  "/real-estate-tokenization-development-company",
  async function (req, res) {
    const path = req.path.split("/");

    cachedParallel(
      path[1],
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).lean().exec(cb);
        },
        blogsdata: function (cb) {
          blogs
            .find({ blog_category: "Tokenization" })
            .select("blog_title blog_link blogimg blog_category date blog_meta_description")
            .limit(3)
            .sort({ _id: -1 })
            .lean()
            .exec(cb);
        },
      },
      function (err, results) {
        if (err) {
          return res.status(500).send("Internal Server Error");
        }

        res.render("Sto/Realestatetokenization.ejs", {
          metadata: results.cmsdata,
          blogsdata: results.blogsdata,
        });
      }
    );
  }
);

router.get("/security-token-offering", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Sto/Securitytokenoffering.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/sto-development", function (req, res, next) {
  res.redirect(301, "/sto-development-company");
});

router.get("/sto-development-company", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
      blogsdata: function (cb) {
        blogs
          .find({ blog_category: "Token" })
          .limit(3)
          .sort({ _id: -1 })
          .exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Sto/Stodevelopment.ejs", {
          metadata: results.cmsdata,
          blogsdata: results.blogsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/sto-exchanges", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Sto/Stoexchanges.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/sto-marketing", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Sto/Stomarketing.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/sto-smart-contacts", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Sto/Stosmartcontracts.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

/* Nftmarketplacejavascript */

router.get("/auction-portal-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nftmarketplacejavascript/Auctionportaldevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/decentraland-like-nft-development", function (req, res, next) {
  res.redirect(301, "/decentraland-clone-script");
});
router.get("/decentraland-clone-script", function (req, res, next) {
  res.redirect(301, "/decentralized-land");
});

router.get("/decentralized-land", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render(
          "Nftmarketplacejavascript/Decentralizedlikenftdevelopment.ejs",
          { metadata: results.cmsdata },
        );
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nba-top-shot-like-nft-marketplace", function (req, res, next) {
  res.redirect(301, "/nba-top-shot-clone-script");
});

router.get("/nba-top-shot-clone-script", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render(
          "Nftmarketplacejavascript/Nbatopshotlikenftmarketplace.ejs",
          { metadata: results.cmsdata },
        );
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/binance-nft-marketplace-clone", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nftmarketplacejavascript/Nftbinanceclone.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-development-in-sidechain", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nftmarketplacejavascript/Nftdevelopmentinsidechain.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-in-flow-blockchain", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nftmarketplacejavascript/Nftinflowblockchain.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-layer2-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nftmarketplacejavascript/Nftlayer2development.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-marketplace-like-niftygate-way", function (req, res, next) {
  res.redirect(301, "/nifty-gateway-clone-script");
});

router.get("/nifty-gateway-clone-script", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nftmarketplacejavascript/Nftmarketlikeniftygateway.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get(
  "/nft-marketplace-development-in-harmony",
  function (req, res, next) {
    res.redirect(301, "/nft-marketplace-in-harmony");
  },
);

router.get("/nft-marketplace-in-harmony", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render(
          "Nftmarketplacejavascript/Nftmarketplacedevelopmentinharmony.ejs",
          { metadata: results.cmsdata },
        );
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get(
  "/nft-marketplace-development-like-zedrun",
  function (req, res, next) {
    res.redirect(301, "/zed-run-clone-script");
  },
);

router.get("/zed-run-clone-script", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render(
          "Nftmarketplacejavascript/Nftmarketplacedevelopmentlikezedrun.ejs",
          { metadata: results.cmsdata },
        );
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-marketplace-in-matic", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nftmarketplacejavascript/Nftmarketplaceinmatric.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-marketplace-like-axieinfinity", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render(
          "Nftmarketplacejavascript/Nftmarketplacelikeaxieinfinity.ejs",
          { metadata: results.cmsdata },
        );
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get(
  "/plung-\\$1trillion-market-binance-clone-script",
  function (req, res, next) {
    res.redirect(301, "/plunge-into-trillion-market-binance-exchange");
  },
);

router.get("/build-crypto-exchange-platform", function (req, res, next) {
  res.redirect(301, "/cost-to-build-crypto-exchange");
});

router.get("/nft-marketplace-like-foundation", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render(
          "Nftmarketplacejavascript/Nftmarketplacelikefoundation.ejs",
          { metadata: results.cmsdata },
        );
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-marketplace-like-gods-unchained", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render(
          "Nftmarketplacejavascript/Nftmarketplacelikegodsunchained.ejs",
          { metadata: results.cmsdata },
        );
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-marketplace-like-opensea", function (req, res, next) {
  res.redirect(301, "/opensea-clone-script");
});

router.get("/opensea-clone-script", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nftmarketplacejavascript/Nftmarketplacelikeopensea.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-marketplace-like-polkacity", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nftmarketplacejavascript/Nftmarketplacelikepolkacity.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-marketplace-like-sorare", function (req, res, next) {
  res.redirect(301, "/sorare-clone-script");
});

router.get("/sorare-clone-script", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nftmarketplacejavascript/Nftmarketplacelikesorare.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-marketplace-like-terra-virtua", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render(
          "Nftmarketplacejavascript/Nftmarketplaceliketerravirtua.ejs",
          { metadata: results.cmsdata },
        );
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-marketplace-on-bsc", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nftmarketplacejavascript/Nftmarketplaceonbsc.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-marketplace-on-cardano", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nftmarketplacejavascript/Nftmarketplaceoncardano.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/rarible-like-nft-marketplace", function (req, res, next) {
  res.redirect(301, "/rarible-clone-script");
});

router.get("/rarible-clone-script", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nftmarketplacejavascript/Rariblelikenftmarketplace.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/social-token-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nftmarketplacejavascript/Socialtokensdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/solanart-clone-script", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nftmarketplacejavascript/SolanartCloneScript.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/solana-based-nft-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nftmarketplacejavascript/Solanbasednftdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/superrare-like-nft-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nftmarketplacejavascript/superrarelikenftdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

/*NFT*/

router.get("/bayc-like-nft-development", function (req, res, next) {
  res.redirect(301, "/bored-ape-yacht-club-clone-script");
});

router.get("/bored-ape-yacht-club-clone-script", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Bayclikenftdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get(
  "/cross-chain-nft-marketplace-development",
  function (req, res, next) {
    res.redirect(301, "/cross-chain-nft-marketplace");
  },
);

router.get("/cross-chain-nft-marketplace", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
      blogsdata: function (cb) {
          blogs
            .find({ blog_category: "NFT" })
            .select("blog_title blog_link blogimg blog_category date blog_meta_description")
            .limit(3)
            .sort({ _id: -1 })
            .exec(cb);
        },
    },
    function (err, results) {
      try {
        res.render("Nft/Crosschainnftmarketplacedevelopment.ejs", {
          metadata: results.cmsdata,
          blogsdata: results.blogsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/cryptopunks-like-nft-development", function (req, res, next) {
  res.redirect(301, "/cryptopunks-clone-script");
});

router.get("/cryptopunks-clone-script", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Cryptopunkslikenftdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get(
  "/fractional-nft-marketplace-development",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("Nft/Fractionalnftmarketplacedevelopment.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);

router.get("/metaverse-nft-marketplace-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/MetaverseNFTMarketplace.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/metaverse-development-company", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Metaverse/Metaversedevelopmentcompany.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/multichian-nft-supports", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Multichainnftsupports.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-development-services-solutions", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Nftdevelopmentservicessolutions.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-exchange-platform-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Nftexchangeplatformdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-for-physical-assets", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Nftforphysicalassets.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-gaming-platform-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Nftgamingplatformdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-lending-platform-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Nftlendingplatfordevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-listing-services", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Nftlistingservices.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-loan-platform-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Nftloanplatformdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-marketplace-for-sports", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Nftmarketforsports.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-marketing", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Nftmarketing.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-marketplace-developme", function (req, res, next) {
  res.redirect(301, "/nft-marketplace-development");
});

router.get("/NFT-marketplace-development", function (req, res, next) {
  res.redirect(301, "/nft-marketplace-development");
});

router.get("/nft-marketplace-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Nftmarketplacedevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-marketplace-For-art", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Nftmarketplaceforart.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-marketplace-for-domains", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Nftmarketplacefordomains.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/nft-marketplace-for-dreams", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Nftmarketplacefordreams.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/nft-marketplace-for-memes", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Nftmarketplaceformemes.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/nft-marketplace-for-music", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Nftmarketplaceformusic.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/nft-marketplace-for-realestate", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/nftmarketplaceforrealestate.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/nft-minting-platform-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Nftmintingplatformdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/nft-staking-platform-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Nftstakingplatformdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/nft-streaming-platform-solutions", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Nftstreamingplatformsolutions.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/nft-studio", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Nftstudio.ejs", { metadata: results.cmsdata });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/nft-token-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Nfttokendevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/shards-nft-platform-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Shardsnftplatformdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/smart-contract-based-nft-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Smartcontractbasednftdevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/whitelabel-multichain-nft-platform", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Nft/Whitelabelmultichainnftplatform.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/white-label-nft-marketplace", function (req, res, next) {
  res.redirect(301, "/white-label-nft-marketplace-development");
});

router.get(
  "/white-label-NFT-marketplace-development",
  function (req, res, next) {
    res.redirect(301, "/white-label-nft-marketplace-development");
  },
);

router.get(
  "/white-label-nft-marketplace-development",
  async function (req, res) {
    const path = req.path.split("/");
    async.parallel(
      {
        cmsdata: function (cb) {
          pages.findOne({ page_link: path[1] }).exec(cb);
        },
      },
      function (err, results) {
        try {
          res.render("Nft/Whitelabelnftmarketplace.ejs", {
            metadata: results.cmsdata,
          });
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  },
);

router.get("/trc20-token-development", async function (req, res) {
  const path = req.path.split("/");
  async.parallel(
    {
      cmsdata: function (cb) {
        pages.findOne({ page_link: path[1] }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.render("Enterprise/Trontokendevelopment.ejs", {
          metadata: results.cmsdata,
        });
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});
router.get("/tron-token-development", function (req, res, next) {
  res.redirect(301, "/trc20-token-development");
});

router.get("/airbnb-clone-script", function (req, res, next) {
  res.redirect(301, "/");
});
router.get("/uber-clone", function (req, res, next) {
  res.redirect(301, "/");
});
router.post("/add-to-sitemap", async function (req, res) {
  fs.readFile("./public/sitemap.xml", function (err, data) {
    const xmlObj = xmlParser.toJson(data, { reversible: true, object: true });
    const foodItemsArray = xmlObj["urlset"]["url"];
    xmlObj["urlset"]["url"].push({
      loc: { $t: "https://www.clarisco.com/" + req.body.url },
      changefreq: { $t: "daily" },
      priority: { $t: "1.00" },
    });

    console.log(req.body);
    const stringifiedXmlObj = JSON.stringify(xmlObj);
    const finalXml = xmlParser.toXml(stringifiedXmlObj);

    fs.writeFile(
      "./public/sitemap.xml",
      formatXml(finalXml, { collapseContent: true }),
      function (err, result) {
        if (err) {
          res.json("err");
        } else {
          res.json("Xml file successfully updated.");
        }
      },
    );
  });
});

router.post("/delete-sitemap", async function (req, res) {
  console.log(req.body);
  fs.readFile("./public/sitemap.xml", function (err, data) {
    const xmlObj = xmlParser.toJson(data, { reversible: true, object: true });
    const foodItemsArray = xmlObj["urlset"]["url"];

    for (let i = 0; i < foodItemsArray.length; i++) {
      if (
        foodItemsArray[i].loc.$t ==
        "https://www.clarisco.com/" + req.body.url
      ) {
        foodItemsArray.splice(i, 1);
      }
    }
    const stringifiedXmlObj = JSON.stringify(xmlObj);
    const finalXml = xmlParser.toXml(stringifiedXmlObj);

    fs.writeFile(
      "./public/sitemap.xml",
      formatXml(finalXml, { collapseContent: true }),
      function (err, result) {
        if (err) {
          res.json("err");
        } else {
          res.json("Xml file deleted successfully and updated.");
        }
      },
    );
  });
});

router.post("/edit-sitemap", async function (req, res) {
  console.log(req.body, "req.body");
  fs.readFile("./public/sitemap.xml", function (err, data) {
    const xmlObj = xmlParser.toJson(data, { reversible: true, object: true });
    const foodItemsArray = xmlObj["urlset"]["url"];

    for (let i = 0; i < foodItemsArray.length; i++) {
      if (
        foodItemsArray[i].loc.$t ==
        "https://www.clarisco.com/" + req.body.old_url
      ) {
        xmlObj["urlset"]["url"][i].loc.$t =
          "https://www.clarisco.com/" + req.body.new_url;
      }
    }
    const stringifiedXmlObj = JSON.stringify(xmlObj);
    const finalXml = xmlParser.toXml(stringifiedXmlObj);

    fs.writeFile(
      "./public/sitemap.xml",
      formatXml(finalXml, { collapseContent: true }),
      function (err, result) {
        if (err) {
          res.json("err");
        } else {
          res.json("Xml file edited successfully and updated.");
        }
      },
    );
  });
});

router.get("/blog/data", function (req, res) {
  async.parallel(
    {
      cmsdata: function (cb) {
        blogs.find({}).sort({ _id: -1 }).exec(cb);
      },
    },
    function (err, results) {
      try {
        res.json(results.cmsdata);
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/blog/data/search", function (req, res) {
  async.parallel(
    {
      cmsdata: function (cb) {
        blogs
          .find({}, { blog_title: 1, blog_link: 1, blogimg: 1, _id: 0 })
          .sort({ _id: -1 })
          .exec(cb);
      },
    },
    function (err, results) {
      try {
        console.log(results, "resiukts");
        res.json(results.cmsdata);
      } catch (err) {
        return callback(new Error("Error"));
      }
    },
  );
});

router.get("/:id", async function (req, res) {
  const OGUrl = decodeURIComponent(req.url);
  const Regex = /[^a-zA-Z0-9-]/;
  const url = OGUrl.split("/")[1];
  if (!Regex.test(url)) {
    async.parallel(
      {
        cmsdata: function (cb) {
          blogs.findOne({ blog_link: req.params.id }).exec(cb);
        },

        blogcategory: function (cb) {
          blog_category.find({}).sort({ _id: -1 }).exec(cb);
        },

        blogdatas: function (cb) {
          blogs
            .find({}, { blog_title: 1, blog_link: 1 })
            .sort({ _id: -1 })
            .exec(cb);
        },
      },
      function (err, results) {
        var data = results.blogdatas;
        try {
          if (results.cmsdata) {
            res.render("Blog/Readmore.ejs", {
              blogtitles: data,
              blogdata: results.cmsdata,
              blogcategory: results.blogcategory,
            });
          } else {
            res
              .status(404)
              .render("common/404", { title: " Sorry, page not found" });
          }
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  } else {
    let cleanedUrl = url.replace(/[^a-zA-Z0-9- ]/g, "");
    cleanedUrl = cleanedUrl.replace(" ", "-");
    const correctionUrl = `/${cleanedUrl}`;
    res.status(301).redirect(`${correctionUrl}`);
  }
});

router.get("/blog/:id", async function (req, res) {
  console.log(req.params.id);
  const OGUrl = decodeURIComponent(req.url);
  const Regex = /[^a-zA-Z0-9-]/;
  const url = OGUrl.split("/")[1];
  if (!Regex.test(url)) {
    async.parallel(
      {
        cmsdata: function (cb) {
          blogs.findOne({ blog_link: "blog/" + req.params.id }).exec(cb);
        },

        blogcategory: function (cb) {
          blog_category.find({}).sort({ _id: -1 }).exec(cb);
        },

        blogdatas: function (cb) {
          blogs
            .find({}, { blog_title: 1, blog_link: 1 })
            .sort({ _id: -1 })
            .exec(cb);
        },
      },
      function (err, results) {
        var data = results.blogdatas;
        try {
          if (results.cmsdata) {
            console.log(results.cmsdata)
            res.render("Blog/Readmore.ejs", {
              blogtitles: data,
              blogdata: results.cmsdata,
              blogcategory: results.blogcategory,
            });
          } else {
            res
              .status(404)
              .render("common/404", { title: " Sorry, page not found" });
          }
        } catch (err) {
          return callback(new Error("Error"));
        }
      },
    );
  } else {
    let cleanedUrl = url.replace(/[^a-zA-Z0-9- ]/g, "");
    cleanedUrl = cleanedUrl.replace(" ", "-");
    const correctionUrl = `/${cleanedUrl}`;
    res.status(301).redirect(`${correctionUrl}`);
  }
});

router.post("/new_contact_submit", function (req, res) {
  let contactdata = req.body;
  // console.log(contactdata, "contactdata");
  if (
    contactdata.name != "" &&
    contactdata.phone != "" &&
    contactdata.email != "" &&
    contactdata.message != ""
  ) {
    async.parallel(
      {
        settings: function (cb) {
          settings.findOne({}, { _id: 0 }).exec(cb);
        },
      },
      function (err, results) {
        if (results) {
          var emaildata = {};
          var sitename = results.settings.sitename;
          var phone = results.settings.phone_number;
          var email = results.settings.email;
          var baseurl = keys.config.baseUrl;
          var name = contactdata.name;
          emaildata["identifier"] = "customer_welcome";
          emaildata["replace_cnt"] = {
            "##SITENAME##": sitename,
            "##PHONE##": phone,
            "##EMAIL##": email,
            "##baseurl##": baseurl,
            "##USERNAME##": name,
            "##DATE##": new Date("dd-mm-YYYY"),
          };
          var strreplace_cnd =
            /##SITENAME##|##USERNAME##|##DATE##|##baseurl##|##PHONE##|##EMAIL##/gi;
          emaildata["strrp_cond"] = strreplace_cnd;
          emaildata["settings"] = { sitename: sitename };
          emaildata["to"] = contactdata.email;

          var sent_mail = new sendmail.get(emaildata, res);

          var emaildata2 = {};
          var sitename2 = results.settings.sitename;

          emaildata2["identifier"] = "customer_details";
          emaildata2["replace_cnt"] = {
            "##USERNAME##": contactdata.name,
            "##CUSTOMEREMAIL##": contactdata.email,
            "##CUSTOMERMOBILE##": contactdata.phone,
            "##CUSTOMERMESSAGE##": contactdata.message,
          };
          var strreplace_cnd2 =
            /##CUSTOMERNAME##|##CUSTOMEREMAIL##|##CUSTOMERMOBILE##|##CUSTOMERCOUNTRY##|##CUSTOMERSTATE##|##CUSTOMERSKYPE##|##CUSTOMERMESSAGE##/gi;
          emaildata2["strrp_cond"] = strreplace_cnd2;
          emaildata2["settings"] = { sitename: sitename2 };
          emaildata2["to"] = "business@clarisco.com";
          emaildata2["cc"] = "info@clarisco.com";
          var sent_mail2 = new sendmail.get(emaildata2, res);
        } else {
          res.json({
            status: false,
            message: "Some error was occurred while updating details",
          });
        }
      },
    );
    const dateStr = new Date().toISOString();
    //  console.log(new Date(dateStr).toString())
    newcontact.create(
      {
        country: contactdata.country,
        email: contactdata.email,
        name: contactdata.name,
        phone: contactdata.countrycode + " " + contactdata.phone,
        message: contactdata.message,
        created_date: new Date(dateStr).toString(),
      },
      function (conerr, conupdate) {
        if (!conerr) {
          res.json({
            status: true,
            message: "Thankyou For Contacting Us We Will Contact You ASAP!",
          });
        } else {
          console.log("not updated");
          res.json({
            status: false,
            message: "Some error was occurred while updating details",
          });
        }
      },
    );
  }
});

// router.post('/contact_submit', function (req, res) {
//       let contactdata = req.body;
//       console.log(contactdata, "contactdata");
//       console.log("--------------", contactdata["socialMedia"]);
//       console.log("=====",contactdata.phone);
//       if (contactdata.country_selector != "" && contactdata.state != "" && contactdata.email != "" && contactdata.subject != "" && contactdata.name != "" && contactdata.phone != "") {

//             async.parallel({
//                   settings: function (cb) {
//                         settings.findOne({}, { _id: 0 }).exec(cb)
//                   }
//             }, function (err, results) {
//                   if (results) {

//                         var emaildata = {};
//                         var sitename = results.settings.sitename;
//                         var phone = results.settings.phone_number;
//                         var email = results.settings.email;
//                         var baseurl = keys.config.baseUrl;
//                         var name = contactdata.name;
//                         emaildata['identifier'] = "customer_welcome";
//                         emaildata['replace_cnt'] = { "##SITENAME##": sitename, "##PHONE##": phone, "##EMAIL##": email, "##baseurl##": baseurl, "##USERNAME##": name, "##DATE##": new Date("dd-mm-YYYY"), };
//                         var strreplace_cnd = /##SITENAME##|##USERNAME##|##DATE##|##baseurl##|##PHONE##|##EMAIL##/gi;
//                         emaildata['strrp_cond'] = strreplace_cnd;
//                         emaildata['settings'] = { "sitename": sitename };
//                         emaildata['to'] = contactdata.email;

//                         var sent_mail = new sendmail.get(emaildata, res);

//                         var emaildata2 = {};
//                         var sitename2 = results.settings.sitename;

//                         emaildata2['identifier'] = "customer_details";
//                         emaildata2["replace_cnt"] = {
//                           "##CUSTOMERNAME##": contactdata.name,
//                           "##CUSTOMEREMAIL##": contactdata.email,
//                           "##CUSTOMERSOCIALMEDIA##": contactdata["socialMedia"],
//                           "##CUSTOMERSOCIALMEDIAREQUIREMENT##":
//                             contactdata["socialMediaRequirement"],
//                           "##CUSTOMERREQUIREMENT##": contactdata.requirement,
//                           "##CUSTOMERSKYPE##": contactdata.skype,
//                           "##CUSTOMERMOBILE##": contactdata.phone,
//                           "##CUSTOMERCOUNTRY##": contactdata.country_selector,
//                           "##CUSTOMERMESSAGE##": contactdata.message,
//                         };
//                         var strreplace_cnd2 =
//                           /##CUSTOMERNAME##|##CUSTOMEREMAIL##|##CUSTOMERSOCIALMEDIAREQUIREMENT##|##CUSTOMERSOCIALMEDIA##|##CUSTOMERREQUIREMENT##|##CUSTOMERMOBILE##|##CUSTOMERCOUNTRY##|##CUSTOMERMESSAGE##/gi;
//                         emaildata2['strrp_cond'] = strreplace_cnd2;
//                         emaildata2['settings'] = { "sitename": sitename2 };
//                         emaildata2['to'] = "business@clarisco.com";
//                         emaildata2['cc'] = "info@clarisco.com";
//                         var sent_mail2 = new sendmail.get(emaildata2, res);

//                   }
//                   else {
//                         res.json({ 'status': false, message: "Some error was occurred while updating details" });
//                   }

//             });
//             const dateStr = new Date().toISOString()
//             contact.create({
//                   "country": contactdata.country_selector,
//                   "state": contactdata.state,
//                   "email": contactdata.email,
//                   "name": contactdata.name,
//                   "phone": contactdata.phone[0],
//                   "message": contactdata.message,
//                   "requirement": contactdata.requirement,
//                   "skype": contactdata.skype,
//                   "created_date": new Date(dateStr).toString(),
//                   socialMedia: contactdata["socialMedia"],
//                    socialMediaRequirement: contactdata["socialMediaRequirement"]
//             }, function (conerr, conupdate) {
//                   if (!conerr) {
//                         console.log(contactdata.gtag, "contactdata.gtag")
//                         const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${contactdata.gtag}`;

//                         request(verifyUrl, (err, response, body) => {

//                               if (err) { console.log(err); }

//                               body = JSON.parse(body);
//                               //console.log(response,"response")

//                               //console.log(body,"body")

//                               if (!body.success && body.success === undefined) {
//                                     //console.log(body.success,"body.success");
//                                     res.json({ "status": false, "msg": "captcha verification failed" });
//                               }
//                               else {
//                                     //console.log(body.score,"verifyUrl");
//                                     // return json message or continue with your function. Example: loading new page, ect
//                                     res.json({ "status": true, "msg": "captcha verification passed", "score": body.score });
//                               }

//                         })
//                   }
//                   else {
//                         console.log('not updated');
//                         res.json({ 'status': false, message: "Some error was occurred while updating details" });
//                   }
//             })
//       }
// });

const verifyReCaptcha = async (req, res, next) => {
  try {
    const req_Body = req.body;
    const response_key = req_Body["g-recaptcha-response"];
    if (req_Body["g-recaptcha-response"] != "") {
      const url = `https://www.google.com/recaptcha/api/siteverify?secret=${"6LdTLxEqAAAAADavOeLG3WdEpV9rdkLJh8JVq79q"}&response=${response_key}`;
      const res = await axios.post(url);
      if (res.data && res.data.success) {
        next();
      } else {
        res.send({ status: false, message: "reCaptcha Error" });
      }
    } else {
      res.send({ status: false, message: "reCaptcha Error" });
    }
  } catch (error) {
    res.send({ status: false, message: "reCaptcha Error" });
  }
};

router.post("/contact_submit", verifyReCaptcha, function (req, res) {
  let contactdata = req.body;

  const phoneContactDatas = contactdata.phones || contactdata.phone[0];
  const countryCode = contactdata.phone[0]?.split(contactdata["mob_phone"])[0];

  async.parallel(
    {
      settings: function (cb) {
        settings.findOne({}, { _id: 0 }).exec(cb);
      },
    },
    function (err, results) {
      if (results) {
        var emaildata = {};
        var sitename = results.settings.sitename;
        var phone = results.settings.phone_number;
        var email = results.settings.email;
        var baseurl = keys.config.baseUrl;
        var name = contactdata.name;
        emaildata["identifier"] = "customer_welcome";
        emaildata["replace_cnt"] = {
          "##SITENAME##": sitename,
          "##PHONE##": phone,
          "##EMAIL##": email,
          "##baseurl##": baseurl,
          "##USERNAME##": name,
          "##DATE##": new Date("dd-mm-YYYY"),
        };
        var strreplace_cnd =
          /##SITENAME##|##USERNAME##|##DATE##|##baseurl##|##PHONE##|##EMAIL##/gi;
        emaildata["strrp_cond"] = strreplace_cnd;
        emaildata["settings"] = { sitename: sitename };
        emaildata["to"] = contactdata.email;
        var sent_mail = new sendmail.get(emaildata, res);
        var emaildata2 = {};
        var sitename2 = results.settings.sitename;

        emaildata2["identifier"] = "customer_details";
        emaildata2["replace_cnt"] = {
          "##CUSTOMERNAME##": contactdata.name,
          "##CUSTOMEREMAIL##": contactdata.email,
          "##CUSTOMERREQUIREMENT##": contactdata.requirement,
          "##CUSTOMERSOCIALMEDIA##": contactdata["socialMedia"],
          "##CUSTOMERSOCIALMEDIAREQUIREMENT##":
            contactdata["socialMediaRequirement"],
          "##CUSTOMERSKYPE##": contactdata.skype,
          "##CUSTOMERMOBILE##": countryCode + "-" + contactdata.mob_phone,
          "##CUSTOMERCOUNTRY##": contactdata.country_selector,
          "##CUSTOMERMESSAGE##": contactdata.message,
        };
        var strreplace_cnd2 =
          /##CUSTOMERNAME##|##CUSTOMEREMAIL##|##CUSTOMERREQUIREMENT##|##CUSTOMERSOCIALMEDIAREQUIREMENT##|##CUSTOMERSOCIALMEDIA##|##CUSTOMERMOBILE##|##CUSTOMERCOUNTRY##|##CUSTOMERMESSAGE##/gi;
        emaildata2["strrp_cond"] = strreplace_cnd2;
        emaildata2["settings"] = { sitename: sitename2 };
        emaildata2["to"] = "business@clarisco.com";
        emaildata2["cc"] = "info@clarisco.com";
        var sent_mail2 = new sendmail.get(emaildata2, res);
      } else {
        res.json({
          status: false,
          message: "Some error was occurred while updating details",
        });
      }
    },
  );
  const dateStr = new Date().toISOString();

  contact.create(
    {
      country: contactdata.country_selector,
      state: contactdata.state,
      email: contactdata.email,
      name: contactdata.name,
      phone: countryCode + "-" + contactdata.mob_phone,
      message: contactdata.message,
      requirement: contactdata.requirement,
      skype: contactdata.skype,
      created_date: new Date(dateStr).toString(),
      socialMedia: contactdata["socialMedia"],
      socialMediaRequirement: contactdata["socialMediaRequirement"],
    },
    function (conerr, conupdate) {
      if (!conerr) {
        console.log(contactdata.gtag, "contactdata.gtag");
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${contactdata.gtag}`;
        request(verifyUrl, (err, response, body) => {
          if (err) {
            console.log(err);
          }
          body = JSON.parse(body);
          if (!body.success && body.success === undefined) {
            res.json({ status: false, msg: "captcha verification failed" });
          } else {
            res.json({
              status: true,
              msg: "captcha verification passed",
              score: body.score,
            });
          }
        });
      } else {
        console.log("not updated");
        res.json({
          status: false,
          message: "Some error was occurred while updating details",
        });
      }
    },
  );
});

router.post("/popup_contact_submit", verifyReCaptcha, function (req, res) {
  let contactdata = req.body;

  const phoneContactDatas =
    contactdata.popup_phones || contactdata.popup_phone[0];
  const countryCode = contactdata.popup_phone.replace(
    contactdata.popup_mob_phone,
    "",
  );
  // const countryCode = contactdata.popup_phone[0]?.split(contactdata["popup_mob_phone"])[0];

  async.parallel(
    {
      settings: function (cb) {
        settings.findOne({}, { _id: 0 }).exec(cb);
      },
    },
    function (err, results) {
      if (results) {
        var emaildata = {};
        var sitename = results.settings.sitename;
        var phone = results.settings.phone_number;
        var email = results.settings.email;
        var baseurl = keys.config.baseUrl;
        var name = contactdata.popup_name;
        emaildata["identifier"] = "customer_welcome";
        emaildata["replace_cnt"] = {
          "##SITENAME##": sitename,
          "##PHONE##": phone,
          "##EMAIL##": email,
          "##baseurl##": baseurl,
          "##USERNAME##": name,
          "##DATE##": new Date("dd-mm-YYYY"),
        };
        var strreplace_cnd =
          /##SITENAME##|##USERNAME##|##DATE##|##baseurl##|##PHONE##|##EMAIL##/gi;
        emaildata["strrp_cond"] = strreplace_cnd;
        emaildata["settings"] = { sitename: sitename };
        emaildata["to"] = contactdata.popup_email;
        var sent_mail = new sendmail.get(emaildata, res);
        var emaildata2 = {};
        var sitename2 = results.settings.sitename;

        emaildata2["identifier"] = "customer_details";
        emaildata2["replace_cnt"] = {
          "##CUSTOMERNAME##": contactdata.popup_name,
          "##CUSTOMEREMAIL##": contactdata.popup_email,
          "##CUSTOMERREQUIREMENT##": contactdata.popup_requirement,
          "##CUSTOMERSOCIALMEDIA##": contactdata["socialMedia"],
          "##CUSTOMERSOCIALMEDIAREQUIREMENT##":
            contactdata["socialMediaRequirement"],
          "##CUSTOMERSKYPE##": contactdata.popup_skype,
          "##CUSTOMERMOBILE##": countryCode + "-" + contactdata.popup_mob_phone,
          "##CUSTOMERCOUNTRY##": contactdata.popup_country_selector,
          "##CUSTOMERMESSAGE##": contactdata.popup_message,
        };
        var strreplace_cnd2 =
          /##CUSTOMERNAME##|##CUSTOMEREMAIL##|##CUSTOMERREQUIREMENT##|##CUSTOMERSOCIALMEDIAREQUIREMENT##|##CUSTOMERSOCIALMEDIA##|##CUSTOMERMOBILE##|##CUSTOMERCOUNTRY##|##CUSTOMERMESSAGE##/gi;
        emaildata2["strrp_cond"] = strreplace_cnd2;
        emaildata2["settings"] = { sitename: sitename2 };
        emaildata2["to"] = "business@clarisco.com";
        emaildata2["cc"] = "info@clarisco.com";
        var sent_mail2 = new sendmail.get(emaildata2, res);
      } else {
        res.json({
          status: false,
          message: "Some error was occurred while updating details",
        });
      }
    },
  );
  const dateStr = new Date().toISOString();

  contact.create(
    {
      country: contactdata.popup_country_selector,
      state: contactdata.popup_state,
      email: contactdata.popup_email,
      name: contactdata.popup_name,
      phone: countryCode + "-" + contactdata.popup_mob_phone,
      message: contactdata.popup_message,
      requirement: contactdata.popup_requirement,
      skype: contactdata.popup_skype,
      created_date: new Date(dateStr).toString(),
      socialMedia: contactdata["socialMedia"],
      socialMediaRequirement: contactdata["socialMediaRequirement"],
    },
    function (conerr, conupdate) {
      if (!conerr) {
        console.log(contactdata.gtag, "contactdata.gtag");
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${contactdata.gtag}`;
        request(verifyUrl, (err, response, body) => {
          if (err) {
            console.log(err);
          }
          body = JSON.parse(body);
          if (!body.success && body.success === undefined) {
            res.json({ status: false, msg: "captcha verification failed" });
          } else {
            res.json({
              status: true,
              msg: "captcha verification passed",
              score: body.score,
            });
          }
        });
      } else {
        console.log("not updated");
        res.json({
          status: false,
          message: "Some error was occurred while updating details",
        });
      }
    },
  );
});

router.post("/portfolio_contact_submit", verifyReCaptcha, function (req, res) {
  let contactdata = req.body;
  console.log(contactdata, "portfolio_contact_submit");
  const phoneContactDatas = contactdata.phones || contactdata.phone[0];
  const countryCode = contactdata.phone[0]?.split(contactdata["mob_phone"])[0];
  async.parallel(
    {
      settings: function (cb) {
        settings.findOne({}, { _id: 0 }).exec(cb);
      },
    },
    function (err, results) {
      if (results) {
        var emaildata = {};
        var sitename = results.settings.sitename;
        var phone = results.settings.phone_number;
        var email = results.settings.email;
        var baseurl = keys.config.baseUrl;
        var name = contactdata.name;
        emaildata["identifier"] = "customer_welcome";
        emaildata["replace_cnt"] = {
          "##SITENAME##": sitename,
          "##PHONE##": phone,
          "##EMAIL##": email,
          "##baseurl##": baseurl,
          "##USERNAME##": name,
          "##DATE##": new Date("dd-mm-YYYY"),
        };
        var strreplace_cnd =
          /##SITENAME##|##USERNAME##|##DATE##|##baseurl##|##PHONE##|##EMAIL##/gi;
        emaildata["strrp_cond"] = strreplace_cnd;
        emaildata["settings"] = { sitename: sitename };
        emaildata["to"] = contactdata.email;
        var sent_mail = new sendmail.get(emaildata, res);
        var emaildata2 = {};
        var sitename2 = results.settings.sitename;

        emaildata2["identifier"] = "customer_details";
        emaildata2["replace_cnt"] = {
          "##CUSTOMERNAME##": contactdata.name,
          "##CUSTOMEREMAIL##": contactdata.email,
          "##CUSTOMERREQUIREMENT##": contactdata.requirement,
          "##CUSTOMERSOCIALMEDIA##": "Skype",
          "##CUSTOMERSOCIALMEDIAREQUIREMENT##": contactdata.skype,
          "##CUSTOMERSKYPE##": contactdata.skype,
          "##CUSTOMERMOBILE##": contactdata.phones,
          "##CUSTOMERCOUNTRY##": contactdata.country_selector,
          "##CUSTOMERMESSAGE##": contactdata.skype,
        };
        var strreplace_cnd2 =
          /##CUSTOMERNAME##|##CUSTOMEREMAIL##|##CUSTOMERREQUIREMENT##|##CUSTOMERSOCIALMEDIAREQUIREMENT##|##CUSTOMERSOCIALMEDIA##|##CUSTOMERMOBILE##|##CUSTOMERCOUNTRY##|##CUSTOMERMESSAGE##/gi;
        emaildata2["strrp_cond"] = strreplace_cnd2;
        emaildata2["settings"] = { sitename: sitename2 };

        emaildata2["to"] = "business@clarisco.com";
        emaildata2["cc"] = "info@clarisco.com";
        var sent_mail2 = new sendmail.get(emaildata2, res);
      } else {
        res.json({
          status: false,
          message: "Some error was occurred while updating details",
        });
      }
    },
  );
  const dateStr = new Date().toISOString();

  contact.create(
    {
      country: contactdata.country_selector,
      state: contactdata.state,
      email: contactdata.email,
      name: contactdata.name,
      phone: contactdata.phones,
      message: "Skype " + contactdata.skype,
      requirement: contactdata.requirement,
      skype: contactdata.skype,
      created_date: new Date(dateStr).toString(),
      socialMedia: "Skype",
      socialMediaRequirement: contactdata.skype,
    },
    function (conerr, conupdate) {
      if (!conerr) {
        console.log(contactdata.gtag, "contactdata.gtag");
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${contactdata.gtag}`;
        request(verifyUrl, (err, response, body) => {
          if (err) {
            console.log(err);
          }
          body = JSON.parse(body);
          if (!body.success && body.success === undefined) {
            res.json({ status: false, msg: "captcha verification failed" });
          } else {
            res.json({
              status: true,
              msg: "captcha verification passed",
              score: body.score,
            });
          }
        });
      } else {
        console.log("not updated");
        res.json({
          status: false,
          message: "Some error was occurred while updating details",
        });
      }
    },
  );
});

router.get("/prevBlog/:id", async function (req, res) {
  try {
    const curId = req.params.id;
    const nextBlog = await blogs
      .findOne({ _id: { $gt: curId } })
      .sort({ _id: 1 })
      .limit(1)
      .exec();

    if (nextBlog) {
      res.send(nextBlog);
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/nextBlog/:id", async function (req, res) {
  try {
    const curId = req.params.id;
    const nextBlog = await blogs
      .findOne({ _id: { $lt: curId } })
      .sort({ _id: -1 })
      .limit(1)
      .exec();

    if (nextBlog) {
      res.send(nextBlog);
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/adjacentBlogs/:id", async function (req, res) {
  try {
    const curId = req.params.id;

    const prevBlog = await blogs
      .findOne({ _id: { $gt: curId } })
      .sort({ _id: 1 });

    const nextBlog = await blogs
      .findOne({ _id: { $lt: curId } })
      .sort({ _id: -1 });

    res.json({
      prev: prevBlog ? prevBlog.blog_link : null,
      next: nextBlog ? nextBlog.blog_link : null,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/pdf-form", verifyReCaptcha, async function (req, res) {
  try {
    const { email } = req.body;

    const newUser = new pdfform({
      email,
    });

    await newUser.save();
    res.send({ success: true, message: "Form submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: "Error submitting form" });
  }
});

router.post("/blog-small-form", verifyReCaptcha, async function (req, res) {
  let contactdata = req.body;
  console.log("contactdata---", contactdata);

  if (!contactdata.name || !contactdata.mob_phone || !contactdata.email) {
    return res.json({
      status: false,
      message: "All fields are required",
    });
  }

  const results = await settings.find({}, { _id: 0 });
  console.log(results);
  if (results && results.length > 0) {
    var emaildata = {};
    var sitename = results[0].sitename;
    var phone = results[0].phone_number;
    var email = results[0].email;
    var baseurl = keys.config.baseUrl;
    var name = contactdata.name;
    emaildata["identifier"] = "customer_welcome";
    emaildata["replace_cnt"] = {
      "##SITENAME##": sitename,
      "##PHONE##": phone,
      "##EMAIL##": email,
      "##baseurl##": baseurl,
      "##USERNAME##": name,
      "##DATE##": new Date("dd-mm-YYYY"),
    };
    var strreplace_cnd =
      /##SITENAME##|##USERNAME##|##DATE##|##baseurl##|##PHONE##|##EMAIL##/gi;
    emaildata["strrp_cond"] = strreplace_cnd;
    emaildata["settings"] = { sitename: sitename };
    emaildata["to"] = contactdata.email;

    var sent_mail = new sendmail.get(emaildata, res);
    var emaildata2 = {};
    var sitename2 = results[0].sitename;

    emaildata2["identifier"] = "customer_details";
    emaildata2["replace_cnt"] = {
      "##CUSTOMERREQUIREMENT##": "This Requirement Is From Blog Page",
      "##CUSTOMERNAME##": contactdata.name,
      "##CUSTOMEREMAIL##": contactdata.email,
      "##CUSTOMERMOBILE##": contactdata.phones,
      "##CUSTOMERMESSAGE##": contactdata.current_path,
      "##CUSTOMERCOUNTRY##": contactdata.country_selector,
    };
    var strreplace_cnd2 =
      /##CUSTOMERNAME##|##CUSTOMEREMAIL##|##CUSTOMERREQUIREMENT##|##CUSTOMERMOBILE##|##CUSTOMERCOUNTRY##|##CUSTOMERSTATE##|##CUSTOMERSKYPE##|##CUSTOMERMESSAGE##/gi;
    emaildata2["strrp_cond"] = strreplace_cnd2;
    emaildata2["settings"] = { sitename: sitename2 };
    emaildata2["to"] = "business@clarisco.com";
    emaildata2["cc"] = "info@clarisco.com";
    var sent_mail2 = new sendmail.get(emaildata2, res);
  }

  const dateStr = new Date().toISOString();
  blogform.create(
    {
      country: contactdata.country_selector,
      email: contactdata.email,
      name: contactdata.name,
      phone: contactdata.phone,
      message: contactdata.current_path,
      created_date: new Date(dateStr).toString(),
    },
    function (conerr, conupdate) {
      if (!conerr) {
        res.json({
          status: true,
          message: "Thankyou For Contacting Us We Will Contact You ASAP!",
        });
      } else {
        console.log("not updated");
        res.json({
          status: false,
          message: "Some error was occurred while updating details",
        });
      }
    },
  );
});

router.get("/partials/mega-menu", (req, res) => {
  res.locals.layout = false;
  res.render("common-new/mega-menu", { layout: false });
});

module.exports = router;
