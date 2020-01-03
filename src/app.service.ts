import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as YAML from 'json2yaml';
import { argentina } from './proxy';

@Injectable()
export class AppService {
  getClash(): any {
    let doc: any;
    const arProxy = [];
    let i = 1;
    try {
      doc = yaml.safeLoad(fs.readFileSync(__dirname + '/clash.yml', 'utf8'));
    } catch (e) {
      return e;
    }
    doc.Proxy = [];
    for (const ar of argentina) {
      const http = {
        name: 'argentina' + i,
        type: 'http',
        server: ar.server,
        port: parseInt(ar.port),
      };
      if (ar.protocol === 'HTTPS') {
        // tslint:disable-next-line: no-string-literal
        http['tls'] = true;
      }
      doc.Proxy.push(http);
      arProxy.push(http.name);
      i++;
    }
    console.log(doc)
    doc['Proxy Group'][0].proxies = arProxy;
    return YAML.stringify(doc);
  }
}
