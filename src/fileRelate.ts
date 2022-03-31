
export namespace NSFileRelate {
    export interface IBase64RegResultMatch {
        isMatch: true;
        dataType: string;
        dataSuffix: string;
        dataData: string;
        mime: string;
    }

    export interface IBase64RegResultNotMatch {
        isMatch: false;
    }

    export type TBase64RegResult = IBase64RegResultNotMatch | IBase64RegResultMatch;
}

export function getDataFromBase64String(base64String: string): NSFileRelate.TBase64RegResult {
    const reg = /^data:(\w+)\/(\w+);base64,(.*)/;
    const result = base64String.match(reg);
    if (result) {
        const groups: any = {
            dataType: result[1],
            dataSuffix: result[2],
            dataData: result[3],
        };
        return {
            isMatch: true,
            dataType: groups.dataType,
            dataSuffix: groups.dataSuffix,
            dataData: groups.dataData,
            mime: groups.dataType + "/" + groups.dataSuffix,
        };
    }
    return {
        isMatch: false
    };
}
