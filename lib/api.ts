import {SiYuanApiAdaptor} from "./siyuan/siYuanApiAdaptor";
import {API_TYPE_CONSTANTS} from "./constants";
import {JvueApiAdaptor} from "./metaweblog/jvueApiAdaptor";
import {ConfApiAdaptor} from "./metaweblog/confApiAdaptor";
import {CnblogsApiAdaptor} from "./metaweblog/cnblogsApiAdaptor";
import {Post} from "./common/post";

export interface IApi {
    getRecentPosts(numOfPosts: number): Promise<Array<any>>
}

export class API implements IApi {
    type: string
    private apiAdaptor: IApi

    constructor(type: string) {
        this.type = type;
        switch (this.type) {
            case API_TYPE_CONSTANTS.API_TYPE_SIYUAN:
                this.apiAdaptor = new SiYuanApiAdaptor()
                break;
            case API_TYPE_CONSTANTS.API_TYPE_JVUE:
                this.apiAdaptor = new JvueApiAdaptor()
                break;
            case API_TYPE_CONSTANTS.API_TYPE_CONF:
                this.apiAdaptor = new ConfApiAdaptor()
                break;
            case API_TYPE_CONSTANTS.API_TYPE_CNBLOGS:
                this.apiAdaptor = new CnblogsApiAdaptor()
                break;
            default:
                throw new Error("未找到接口适配器，请检查参数")
        }
    }

    async getRecentPosts(numOfPosts: number): Promise<Array<Post>> {
        return this.apiAdaptor.getRecentPosts(numOfPosts);
    }
}

