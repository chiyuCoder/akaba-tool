
export namespace NSFileRelate {
    export interface IBase64RegResultMatch {
        isMatch: true;
        dataType: string;
        dataSuffix: string;
        dataData: string;
        /**
         * @since 1.3.1
         */
        additionalInfo?: string,
        mime: string;
    }

    export interface IBase64RegResultNotMatch {
        isMatch: false;
    }

    export type TBase64RegResult = IBase64RegResultNotMatch | IBase64RegResultMatch;

    export interface ParsedPath {
        root: string,
        dir: string,
        base: string,
        name: string,
        ext: string,
        isMatch: boolean,
    }
}

/**
 * @description  获取dataUrl中的信息  
 * -- getDataFromBase64String("data:image/png;base64,base64Content") 返回 { isMatch: true, dataType: "image", dataSuffix: "png", mime: "image/png", dataData: "base64Content", additionalInfo:""  }  
 * -- getDataFromBase64String("data:;base64,remain+text") 返回 { isMatch: true, dataType: "", dataSuffix: "", mime: "/", dataData: "remain+text", additionalInfo:""  }  
 * -- getDataFromBase64String("data:,remain+text") 返回 { isMatch: true, dataType: "", dataSuffix: "", mime: "/", dataData: "remain+text" }
 * -- getDataFromBase64String("data:image/png;fileName=b.png,c=8&d=9,base64,remain+text") 返回 { isMatch: true, dataType: "", dataSuffix: "", mime: "/", dataData: "remain+text", additionalInfo:"" }  
 * -- getDataFromBase64String("data:image/png;fileName=b.png,c=8&d=9,type=base64,base64,remain+text") 返回 { isMatch: true, dataType: "image", dataSuffix: "png", mime: "image/png", dataData: "remain+text",additionalInfo: "fileName=b.png,c=8&d=9,type=base64," }  
 * @param base64String 
 * @returns 
 */
export function getDataFromBase64String(base64String: string): NSFileRelate.TBase64RegResult {
    const reg = /^data:(?:(\w+)\/(\w+))?(?:;(.*)?base64)?,(.*)/;
    const result = base64String.match(reg);
    if (result) {
        const groups: any = {
            dataType: result[1] || "",
            dataSuffix: result[2] || "",
            dataData: result[4] || "",
        };
        return {
            isMatch: true,
            dataType: groups.dataType,
            dataSuffix: groups.dataSuffix,
            dataData: groups.dataData,
            mime: groups.dataType + "/" + groups.dataSuffix,
            additionalInfo: result[3] || "",
        };
    }
    return {
        isMatch: false,
    };
}

/**
 * @description 解析路径  
 * -- parsePath("c:/a/b/c.png") 返回 { isMatch: true, root: "c:/", dir: "a/b/", ext: ".png", base: "c.png", name: "c" }  
 * -- parsePath("/a/b/c.png") 返回 { isMatch: true, root: "/", dir: "a/b/", ext: ".png", base: "c.png", name: "c" }  
 * -- parsePath("/a/b/c.png?foo=bar") 返回 { isMatch: true, root: "/", dir: "a/b/", ext: ".png?foo=bar", base: "c.png?foo=bar", name: "c" }  
 * -- parsePath("../b/c") 返回 { isMatch: true, root: "", dir: "../b/", ext: "", base: "c", name: "c" }  
 * -- parsePath("./b/c") 返回 { isMatch: true, root: "", dir: "./b/", ext: "", base: "c", name: "c" }  
 * @param pathname 
 * @returns 
 */
export function parsePath(pathname: string): NSFileRelate.ParsedPath {
    const reg = /^(\/?|(?:\w:\/)?|)?([\s\S]*?)((?:\.{1,2})|[^/]+?|)(\.[^./]*|)(?:[/]*)$/;
    const result = pathname.match(reg);
    if (result) {
        return {
            root: result[1] || "",
            dir: result[2] || "",
            base: (result[3] || "") + (result[4] || ""),
            name: result[3] || "",
            ext: result[4] || "",
            isMatch: true,
        };
    }
    return {
        root: "",
        dir: "",
        base: "",
        name: "",
        ext: "",
        isMatch: false,
    };
}

