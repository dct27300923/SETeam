import httpProxy from 'http-proxy';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const proxy = httpProxy.createProxy();

  const rewritePath = (url, pathRewrite) => {
    for (const patternStr in pathRewrite) {
      const pattern = RegExp(patternStr);
      const path = pathRewrite[patternStr];
      if (pattern.test(url)) {
        return url.replace(pattern, path);
      }
    }
    return url;
  };

  req.url = rewritePath(req.url, {
    '^/api/': '',
  });

  proxy
    .on('error', (err) => {
      console.error('API_FIRST_FAIL', err);
      try {
        res.status(500).end();
      } catch (err) {
        console.error('API_SECOND_FAIL', err);
      }
    })
    .web(req, res, {
      target: 'http://localhost:4000/',
      changeOrigin: true,
      xfwd: true,
      followRedirects: true,
    }),
    (err) => {
      console.error(err);
    };
};
