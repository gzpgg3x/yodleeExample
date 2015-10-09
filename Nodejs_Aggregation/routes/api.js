var request = require('request');
var https = require('https');
var fs = require('fs');
var querystring = require('querystring');
var obj;
var HOST_URL = "https://rest.developer.yodlee.com/services/srest/restserver/v1.0/";

function show(name,statcode,obj){
    console.log('\n'+name);
    console.log('statusCode: ' + statcode);
    console.log('\n'+JSON.stringify(obj)+'\n');
}

exports.coblogin = function (cobrandLogin, cobrandPassword,callback) {
    request.post(HOST_URL+'authenticate/coblogin',
        { form: { "cobrandLogin":cobrandLogin,"cobrandPassword":cobrandPassword } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('coblogin()',response.statusCode,obj);
                cSessionToken = obj.cobrandConversationCredentials.sessionToken;
                console.log("cSessionToken: " + cSessionToken);
                callback(obj);
            }
        }
    );
}

exports.login = function (cSessionToken,login,password,callback) {
    request.post(HOST_URL+'authenticate/login​',
        { form: { "cobSessionToken":cSessionToken,"login":login,"password":password } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('login()',response.statusCode,obj);
                uSessionToken = obj.userContext.conversationCredentials.sessionToken; // Get user token to run getContentServiceInfoByRoutingNumber function
                console.log("uSessionToken: " + uSessionToken);
                callback(obj);
            }
        }
    );
}

exports.searchSite = function (cobSessionToken,userSessionToken,siteSearchString,callback){
    request.post(HOST_URL+'jsonsdk/SiteTraversal/searchSite',
        { form: { 
            "cobSessionToken":cobSessionToken,
            "userSessionToken":userSessionToken,
            "siteSearchString":siteSearchString
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('searchSite()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}

exports.getSiteInfo = function (cobSessionToken,siteFilter_reqSpecifier,siteFilter_siteId,callback){
    request.post(HOST_URL+'jsonsdk/SiteTraversal/getSiteInfo',
        { form: { 
            "cobSessionToken":cobSessionToken,
            "siteFilter.reqSpecifier":siteFilter_reqSpecifier,
            "siteFilter.siteId":siteFilter_siteId 
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('getSiteInfo()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}

exports.getSiteLoginForm = function (cobSessionToken,userSessionToken,siteId,callback){
    request.post(HOST_URL+'jsonsdk/SiteAccountManagement/getSiteLoginForm',
        { form: {
            "cobSessionToken":cobSessionToken,
            "userSessionToken":userSessionToken,
            "siteId":siteId
        } },   
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('getSiteLoginForm()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}

exports.addSiteAccount1 = function (cobSessionToken,userSessionToken,siteId,credentialFields_enclosedType,credentialFields0_name,credentialFields0_displayName,credentialFields0_isEditable,credentialFields0_isOptional,credentialFields0_helpText,credentialFields0_value,credentialFields0_validValues,credentialFields0_valueIdentifier,credentialFields0_valueMask,credentialFields0_fieldType_typeName,credentialFields0_size,credentialFields0_maxlength,credentialFields0_isMFA,credentialFields0_misOptionalMFA,credentialFields1_name,credentialFields1_displayName,credentialFields1_isEditable,credentialFields1_isOptional,credentialFields1_helpText,credentialFields1_value,credentialFields1_validValues,credentialFields1_valueIdentifier,credentialFields1_valueMask,credentialFields1_fieldType_typeName,credentialFields1_size,credentialFields1_maxlength,credentialFields1_isMFA,credentialFields1_misOptionalMFA,callback){
    request.post(HOST_URL+'jsonsdk/SiteAccountManagement/addSiteAccount1',
        { form: {
            "cobSessionToken":cobSessionToken,
            "userSessionToken":userSessionToken,
            "siteId": siteId,
            "credentialFields.enclosedType":credentialFields_enclosedType,
            "credentialFields[0].name": credentialFields0_name, 
            "credentialFields[0].displayName": credentialFields0_displayName, 
            "credentialFields[0].isEditable": credentialFields0_isEditable, 
            "credentialFields[0].isOptional": credentialFields0_isOptional, 
            "credentialFields[0].helpText": credentialFields0_helpText,
            "credentialFields[0].value": credentialFields0_value,
            "credentialFields[0].validValues": credentialFields0_validValues,
            "credentialFields[0].valueIdentifier": credentialFields0_valueIdentifier,
            "credentialFields[0].valueMask": credentialFields0_valueMask,
            "credentialFields[0].fieldType.typeName": credentialFields0_fieldType_typeName, 
            "credentialFields[0].size": credentialFields0_size,
            "credentialFields[0].maxlength": credentialFields0_maxlength,
            "credentialFields[0].isMFA":credentialFields0_isMFA,
            "credentialFields[0].misOptionalMFA":credentialFields0_misOptionalMFA,  
            "credentialFields[1].name": credentialFields1_name,
            "credentialFields[1].displayName": credentialFields1_displayName,
            "credentialFields[1].isEditable": credentialFields1_isEditable,
            "credentialFields[1].isOptional": credentialFields1_isOptional,
            "credentialFields[1].helpText": credentialFields1_helpText,
            "credentialFields[1].value": credentialFields1_value,
            "credentialFields[1].validValues": credentialFields1_validValues,
            "credentialFields[1].valueIdentifier": credentialFields1_valueIdentifier,
            "credentialFields[1].valueMask": credentialFields1_valueMask,
            "credentialFields[1].fieldType.typeName": credentialFields1_fieldType_typeName,
            "credentialFields[1].size": credentialFields1_size,
            "credentialFields[1].maxlength": credentialFields1_maxlength,
            "credentialFields[1].isMFA":credentialFields1_isMFA,
            "credentialFields[1].misOptionalMFA":credentialFields1_misOptionalMFA
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('addSiteAccount1()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}

exports.addSiteAccount2 = function (parameters,callback){
    request.post(HOST_URL+'jsonsdk/SiteAccountManagement/addSiteAccount1?'+parameters,
        { form: { } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('addSiteAccount2()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}

exports.getSiteRefreshInfo = function (cobSessionToken,userSessionToken,memSiteAccId,callback){
    request.post(HOST_URL+'jsonsdk/Refresh/getSiteRefreshInfo',
        { form: {
            "cobSessionToken":cobSessionToken,
            "userSessionToken":userSessionToken,
            "memSiteAccId": memSiteAccId
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('getSiteRefreshInfo()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}

exports.getMFAResponseForSite = function (cobSessionToken,userSessionToken,memSiteAccId,callback){
    request.post(HOST_URL+'jsonsdk/Refresh/getMFAResponseForSite',
        { form: { 
            "cobSessionToken":cobSessionToken,
            "userSessionToken":userSessionToken,
            "memSiteAccId": memSiteAccId
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('getMFAResponseForSite()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}

exports.putMFARequestForSite = function (cobSessionToken,userSessionToken,memSiteAccId,userResponse_objectInstanceType,parameters,callback){
    if (parameters == "")
    {
        url = HOST_URL+'jsonsdk/Refresh/putMFARequestForSite';
        data = {
                "cobSessionToken":cobSessionToken,
                "userSessionToken":userSessionToken,
                "memSiteAccId":memSiteAccId,
                "userResponse.objectInstanceType":userResponse_objectInstanceType
            };
    }
    else
    {
        url = HOST_URL+'jsonsdk/Refresh/putMFARequestForSite?'+parameters;
        data = { };
    }

    request.post(url,
        { form: data },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('getMFAResponseForSite()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}

exports.getSiteAccounts = function (cobSessionToken,userSessionToken,memSiteAccIds0,memSiteAccIds1,callback){
    if (memSiteAccIds0!="" && memSiteAccIds1!="")
    {
        data = {
            "cobSessionToken":cobSessionToken,
            "userSessionToken":userSessionToken,
            "memSiteAccIds[0]":memSiteAccIds0,
            "memSiteAccIds[1]":memSiteAccIds1
        }
    }
    else
    {
        data = {
            "cobSessionToken":cobSessionToken,
            "userSessionToken":userSessionToken
        }
    }

    request.post(HOST_URL+'jsonsdk/SiteAccountManagement/getSiteAccounts',
        { form: data},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('getSiteAccounts()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}

exports.startSiteRefresh = function (cobSessionToken,userSessionToken,memSiteAccId,refreshParameters_refreshPriority,refreshParameters_refreshMode_refreshModeId,refreshParameters_refreshMode_refreshMode,callback){
    request.post(HOST_URL+'jsonsdk/Refresh/startSiteRefresh',
        { form: { 
            "cobSessionToken":cobSessionToken,
            "userSessionToken":userSessionToken,
            "memSiteAccId":memSiteAccId,
            "refreshParameters.refreshPriority":refreshParameters_refreshPriority,
            "refreshParameters.refreshMode.refreshModeId":refreshParameters_refreshMode_refreshModeId,
            "refreshParameters.refreshMode.refreshMode":refreshParameters_refreshMode_refreshMode
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('startSiteRefresh()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}

exports.updateSiteAccountCredentials = function (cobSessionToken,userSessionToken,memSiteAccId,credentialFields_enclosedType,credentialFields0_helpText,credentialFields0_maxlength,credentialFields0_name,credentialFields0_size,credentialFields0_value,credentialFields0_valueIdentifier,credentialFields0_valueMask,credentialFields1_displayName,credentialFields1_fieldType_typeName,credentialFields1_helpText,credentialFields1_maxlength,credentialFields1_name,credentialFields1_size,credentialFields1_value,credentialFields1_valueIdentifier,credentialFields1_valueMask,callback){
    request.post(HOST_URL+'jsonsdk/SiteAccountManagement/updateSiteAccountCredentials',
        { form: {
            "cobSessionToken":cobSessionToken,
            "userSessionToken":userSessionToken,
            "memSiteAccId": memSiteAccId,
            "credentialFields.enclosedType": credentialFields_enclosedType,
            "credentialFields[0].helpText": credentialFields0_helpText,
            "credentialFields[0].maxlength": credentialFields0_maxlength,
            "credentialFields[0].name": credentialFields0_name,
            "credentialFields[0].size": credentialFields0_size,
            "credentialFields[0].value": credentialFields0_value,
            "credentialFields[0].valueIdentifier": credentialFields0_valueIdentifier,
            "credentialFields[0].valueMask": credentialFields0_valueMask,
            "credentialFields[1].displayName": credentialFields1_displayName,
            "credentialFields[1].fieldType.typeName": credentialFields1_fieldType_typeName,
            "credentialFields[1].helpText": credentialFields1_helpText,
            "credentialFields[1].maxlength": credentialFields1_maxlength,
            "credentialFields[1].name": credentialFields1_name,
            "credentialFields[1].size": credentialFields1_size,
            "credentialFields[1].value": credentialFields1_value,
            "credentialFields[1].valueIdentifier": credentialFields1_valueIdentifier,
            "credentialFields[1].valueMask": credentialFields1_valueMask
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('updateSiteAccountCredentials()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}

exports.updateSiteAccountCredentials2 = function (parameters,callback){
    request.post(HOST_URL+'jsonsdk/SiteAccountManagement/updateSiteAccountCredentials?'+parameters,
        { form: {  } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('updateSiteAccountCredentials2()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}

exports.removeSiteAccount = function (cobSessionToken,userSessionToken,memSiteAccId,callback){
    request.post(HOST_URL+'jsonsdk/SiteAccountManagement/removeSiteAccount',
        { form: {
            "cobSessionToken":cobSessionToken,
            "userSessionToken":userSessionToken,
            "memSiteAccId":memSiteAccId
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('removeSiteAccount()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}

exports.getRefreshedUserItems = function (cobSessionToken,refreshDataFilter_requiredAll,refreshDataFilter_startDate,refreshDataFilter_endDate,refreshDataFilter_refreshType0,callback){
    request.post(HOST_URL+'jsonsdk/Refresh/getRefreshedUserItems',
        { form: {
            "cobSessionToken":cobSessionToken,
            "refreshDataFilter.requiredAll":refreshDataFilter_requiredAll,
            "refreshDataFilter.startDate":refreshDataFilter_startDate,
            "refreshDataFilter.endDate":refreshDataFilter_endDate,
            "refreshDataFilter.refreshType[0]":refreshDataFilter_refreshType0
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('getRefreshedUserItems()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}

exports.searchContentServices = function (cobSessionToken,userSessionToken,keywords,notrim,callback){
    request.post(HOST_URL+'jsonsdk/Search/searchContentServices',
        { form: {
            "cobSessionToken":cobSessionToken,
            "userSessionToken":userSessionToken,
            "keywords": keywords,
            "notrim":notrim
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('searchContentServices()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}

exports.getContentServiceInfo1 = function (cobSessionToken,contentServiceId,reqSpecifier,notrim,callback){
    request.post(HOST_URL+'jsonsdk/ContentServiceTraversal/getContentServiceInfo1',
        { form: {
            "cobSessionToken":cobSessionToken,
            "contentServiceId":contentServiceId,
            "reqSpecifier":reqSpecifier,
            "notrim":notrim
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('getContentServiceInfo1()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}

exports.getLoginFormForContentService = function (cobSessionToken,contentServiceId,callback){
    request.post(HOST_URL+'jsonsdk/ItemManagement/getLoginFormForContentService',
        { form: {
            "cobSessionToken":cobSessionToken,
            "contentServiceId":contentServiceId
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('getLoginFormForContentService()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}

exports.addItemForContentService1 = function (parameters,callback){
    request.post(HOST_URL+'jsonsdk/ItemManagement/addItemForContentService1?'+parameters,
        { form: { } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('addItemForContentService1()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}

exports.getRefreshInfo1 = function (cobSessionToken,userSessionToken,itemIds0,itemIds1,callback){
    request.post(HOST_URL+'jsonsdk/Refresh/getRefreshInfo1',
        { form: {
            "cobSessionToken":cobSessionToken,
            "userSessionToken":userSessionToken,
            "itemIds[0]":itemIds0,
            "itemIds[1]":itemIds1
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('getRefreshInfo1()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}

exports.isItemRefreshing = function (cobSessionToken,userSessionToken,memItemId,callback){
    request.post(HOST_URL+'jsonsdk/Refresh/isItemRefreshing',
        { form: {
            "cobSessionToken":cobSessionToken,
            "userSessionToken":userSessionToken,
            "memItemId":memItemId
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('isItemRefreshing()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}

exports.startRefresh7 = function (cobSessionToken,userSessionToken,itemId,refreshParameters_refreshMode_refreshMode,refreshParameters_refreshMode_refreshModeId,refreshParameters_refreshPriority,callback){
    request.post(HOST_URL+'jsonsdk/Refresh/startRefresh7',
        { form: {
            "cobSessionToken":cobSessionToken,
            "userSessionToken":userSessionToken,
            "itemId":itemId,
            "refreshParameters.refreshMode.refreshMode":refreshParameters_refreshMode_refreshMode,
            "refreshParameters.refreshMode.refreshModeId":refreshParameters_refreshMode_refreshModeId,
            "refreshParameters.refreshPriority":refreshParameters_refreshPriority
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('startRefresh7()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}

exports.getMFAResponse = function (cobSessionToken,userSessionToken,itemId,callback){
    request.post(HOST_URL+'jsonsdk/Refresh/getMFAResponse',
        { form: {
            "cobSessionToken":cobSessionToken,
            "userSessionToken":userSessionToken,
            "itemId": itemId
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('getMFAResponse()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}

exports.putMFARequest = function (cobSessionToken,userSessionToken,itemId,userResponse_objectInstanceType,userResponse_token,callback){
    request.post(HOST_URL+'jsonsdk/Refresh/putMFARequest',
        { form: {
            "cobSessionToken":cobSessionToken,
            "userSessionToken":userSessionToken,
            "itemId":itemId,
            "userResponse.objectInstanceType":userResponse_objectInstanceType,
            "userResponse.token":userResponse_token
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('putMFARequest()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}

exports.getItemSummariesWithoutItemData = function (cobSessionToken,userSessionToken,callback){
    request.post(HOST_URL+'jsonsdk/DataService/getItemSummariesWithoutItemData',
        { form: {
            "cobSessionToken":cobSessionToken,
            "userSessionToken":userSessionToken
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('getItemSummariesWithoutItemData()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}

exports.getItemSummaryForItem1 = function (cobSessionToken,userSessionToken,itemId,dex_startLevel,dex_endLevel,dex_extentLevels0,dex_extentLevels1,callback){
    request.post(HOST_URL+'jsonsdk/DataService/getItemSummaryForItem1',
        { form: {
            "cobSessionToken":cobSessionToken,
            "userSessionToken":userSessionToken,
            "itemId":itemId,
            "dex.startLevel":dex_startLevel,
            "dex.endLevel":dex_endLevel,
            "dex.extentLevels[0]":dex_extentLevels0,
            "dex.extentLevels[1]":dex_extentLevels1
        } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body);
                show('getItemSummaryForItem1()',response.statusCode,obj);
                callback(obj);
            }
        }
    );
}