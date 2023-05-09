
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

export function getDataFromBase64String(base64String: string): NSFileRelate.TBase64RegResult {
    const reg = /^data:(\w+)\/(\w+);(.*)?base64,(.*)/;
    const result = base64String.match(reg);
    if (result) {
        const groups: any = {
            dataType: result[1],
            dataSuffix: result[2],
            dataData: result[4],
        };
        return {
            isMatch: true,
            dataType: groups.dataType,
            dataSuffix: groups.dataSuffix,
            dataData: groups.dataData,
            mime: groups.dataType + "/" + groups.dataSuffix,
            additionalInfo: result[3],
        };
    }
    return {
        isMatch: false,
    };
}


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

