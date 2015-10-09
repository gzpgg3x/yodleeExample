var express = require('express');
var router = express.Router();
var api = require('./api');
var util = require('util');

router.get('/', function(req, res) {
    res.render('index', { title: 'Yodlee APIs' });
});

router.post('/coblogin', function(req, res) {
	obj = api.coblogin(req.body.cobrandLogin,
						req.body.cobrandPassword, 
	function(message){
    	//res.send(200, message);
    	res.status(200).send(message)
  	});
});

router.post('/login', function(req, res) {
	obj = api.login(req.body.cobSessionToken,
					req.body.login,
					req.body.password, 
	function(message){
    	res.send(200, message);
    	//res.status(200).send(message)    	
  	});
});

router.post('/searchSite', function(req, res) {
	obj = api.searchSite(req.body.cobSessionToken,
						req.body.userSessionToken,
						req.body.siteSearchString, 
	function(message){
    	res.send(200, message);
  	});
});

router.post('/getSiteInfo', function(req, res){
	obj = api.getSiteInfo(req.body.cobSessionToken,
						req.body.siteFilter_reqSpecifier,
						req.body.siteFilter_siteId, 
	function(message){
    	res.send(200, message);
  	});
});

router.post('/getSiteLoginForm', function(req, res){
	obj = api.getSiteLoginForm(req.body.cobSessionToken,
							req.body.userSessionToken,
							req.body.siteId, 
	function(message){
    	res.send(200, message);
  	});
});

router.post('/addSiteAccount1', function(req, res){

});

router.post('/addSiteAccount2', function(req, res){
	obj = api.addSiteAccount2(req.body.parameters,
	function(message){
    	res.send(200, message);
  	});
});

function routerGetSiteRefreshInfo(res,cobSessionToken,userSessionToken,memSiteAccId){
	obj = api.getSiteRefreshInfo(cobSessionToken,
								userSessionToken,
								memSiteAccId,
	function(message){
		code = ""
		siteRefreshStatus = ""

		code = message.code;
		siteRefreshStatus = message.siteRefreshStatus.siteRefreshStatus;

		if (code == 801)
			routerGetSiteRefreshInfo(res,cobSessionToken,userSessionToken,memSiteAccId);
		else if (code == 0)
		{
			if (siteRefreshStatus == "REFRESH_COMPLETED" || siteRefreshStatus == "REFRESH_TIMED_OUT")
			{
				console.log('\nSUCCESS');
				res.send(200, message);
			}
			else routerGetSiteRefreshInfo(res,cobSessionToken,userSessionToken,memSiteAccId);
		}
		else
		{
			console.log('\nFAILED');
			res.send(200, message);
		}
  	});
}

router.post('/getSiteRefreshInfo', function(req, res){
	routerGetSiteRefreshInfo(res,req.body.cobSessionToken,req.body.userSessionToken,req.body.memSiteAccId);
});

function routerGetMFAResponseForSite(res,cobSessionToken,userSessionToken,memSiteAccId){
	obj = api.getMFAResponseForSite(cobSessionToken,
								userSessionToken,
								memSiteAccId,
	function(message){
		errorCode = 0; // Missing return param
		isMessageAvailable = "";

		errorCode = message.errorCode;
		isMessageAvailable = message.isMessageAvailable;

		if (errorCode == 0 || typeof(errorCode) == 'undefined')
		{
			res.send(200, message);
		}
		else
		{
			if (isMessageAvailable == true)
			{
				res.send(200, message);
			}
			else if (isMessageAvailable == false)
			{
				routerGetMFAResponseForSite(res,cobSessionToken,userSessionToken,memSiteAccId);
			}
			else
			{
				console.log('\nFAILED');
				res.send(200, message);
			}
		}
	});
}

router.post('/getMFAResponseForSite', function(req, res){
	routerGetMFAResponseForSite(res,req.body.cobSessionToken,req.body.userSessionToken,req.body.memSiteAccId);
});

function routerPutMFARequestForSite(res,parameters){
	obj = api.putMFARequestForSite("","","","",parameters,

	function(message){
		primitiveObj = "";
		primitiveObj = message.primitiveObj;

		if (primitiveObj == true)
		{
			res.send(200, message);
		}
		else 
		{
			console.log('\nFAILED');
			res.send(200, message);
		}
	});
}

router.post('/putMFARequestForSite', function(req, res){
	routerPutMFARequestForSite(res,req.body.parameters);
});

router.post('/getSiteAccounts', function(req, res){
	obj = api.getSiteAccounts(req.body.cobSessionToken,
							req.body.userSessionToken,
							req.body.memSiteAccIds_0,
							req.body.memSiteAccIds_1, 
	function(message){
    	res.send(200, message);
  	});
});

router.post('/startSiteRefresh', function(req, res){
	obj = api.startSiteRefresh(req.body.cobSessionToken,
							req.body.userSessionToken,
							req.body.memSiteAccId,
							req.body.refreshParameters_refreshPriority,
							req.body.refreshParameters_refreshMode_refreshModeId,
							req.body.refreshParameters_refreshMode_refreshMode, 
	function(message){
    	res.send(200, message);
  	});
});

router.post('/updateSiteAccountCredentials2', function(req, res){
	obj = api.updateSiteAccountCredentials2(req.body.parameters,
	function(message){
    	res.send(200, message);
  	});
});

router.post('/removeSiteAccount', function(req, res){
	obj = api.removeSiteAccount(req.body.cobSessionToken,
								req.body.userSessionToken,
								req.body.memSiteAccId, 
	function(message){
    	res.send(200, message);
  	});
});

router.post('/searchContentServices', function(req, res){
	obj = api.searchContentServices(req.body.cobSessionToken,
									req.body.userSessionToken,
									req.body.keywords,
									req.body.notrim, 
	function(message){
    	res.send(200, message);
  	});
});

router.post('/getContentServiceInfo1', function(req, res){
	obj = api.getContentServiceInfo1(req.body.cobSessionToken,
									req.body.contentServiceId,
									req.body.reqSpecifier,
									req.body.notrim, 
	function(message){
    	res.send(200, message);
  	});
});

router.post('/getLoginFormForContentService', function(req, res){
	obj = api.getLoginFormForContentService(req.body.cobSessionToken,
											req.body.contentServiceId, 
	function(message){
    	res.send(200, message);
  	});
});

router.post('/addItemForContentService1', function(req, res){
	obj = api.addItemForContentService1(req.body.parameters,
	function(message){
    	res.send(200, message);
  	});
});

router.post('/getRefreshInfo1', function(req, res){
	obj = api.getRefreshInfo1(req.body.cobSessionToken,
							req.body.userSessionToken,
							req.body.itemIds_0,
							req.body.itemIds_1,
	function(message){
    	res.send(200, message);
  	});
});

function routerIsItemRefreshing(res,cobSessionToken,userSessionToken,memItemId){
	obj = api.isItemRefreshing(cobSessionToken,
								userSessionToken,
								memItemId,
	function(message){
		primitiveObj = "";
		primitiveObj = message.primitiveObj;

		if (primitiveObj == false) res.send(200, message);
		else if (primitiveObj == true)
			routerIsItemRefreshing(res,cobSessionToken,userSessionToken,memItemId);
		else
		{
			console.log('\nFAILED');
			res.send(200, message);
		}
	});
}

router.post('/isItemRefreshing', function(req, res){
	routerIsItemRefreshing(res,req.body.cobSessionToken,req.body.userSessionToken,req.body.memItemId);
});

router.post('/startRefresh7', function(req, res){
	obj = api.startRefresh7(req.body.cobSessionToken,
							req.body.userSessionToken,
							req.body.itemId,
							req.body.refreshParameters_refreshMode_refreshMode,
							req.body.refreshParameters_refreshMode_refreshModeId,
							req.body.refreshParameters_refreshPriority, 
	function(message){
    	res.send(200, message);
  	});
});

function routerGetMFAResponse(res,cobSessionToken,userSessionToken,itemId){
	obj = api.getMFAResponse(cobSessionToken,
							userSessionToken,
							itemId,
	function(message){
		errorCode = 0;
		isMessageAvailable = "";

		errorCode = message.errorCode;
		isMessageAvailable = message.isMessageAvailable;
		
		if (errorCode!="" && isMessageAvailable!="")
		{
			if (errorCode == 0) routerGetMFAResponse(res,cobSessionToken,userSessionToken,memSiteAccId);
			else
			{
				if (isMessageAvailable == true)
					res.send(200, message);
				else if (isMessageAvailable == false)
					res.send(200, message);
				else
					console.log('\nFAILED');
					res.send(200, message);
			}
		}
		else
		{
			console.log('\nFAILED');
			res.send(200, message);
		}
	});
}

router.post('/getMFAResponse', function(req, res){
	routerGetMFAResponse(res,req.body.cobSessionToken,req.body.userSessionToken,req.body.itemId);
});

function routerPutMFARequest(res,cobSessionToken,userSessionToken,itemId,userResponse_objectInstanceType,userResponse_token){
	obj = api.putMFARequest(cobSessionToken,
							userSessionToken,
							itemId,
							userResponse_objectInstanceType,
							userResponse_token,
	function(message){
		primitiveObj = "";
		primitiveObj = message.primitiveObj;

		if (primitiveObj == true)
		{
			res.send(200, message);
		}
		else
		{
			console.log('\nFAILED');
			res.send(200, message);
		}
	});
}

router.post('/putMFARequest', function(req, res){
	routerPutMFARequest(res,req.body.cobSessionToken,req.body.userSessionToken,req.body.itemId,req.body.userResponse_objectInstanceType,req.body.userResponse_token)
});

router.post('/getItemSummariesWithoutItemData', function(req, res){
	obj = api.getItemSummariesWithoutItemData(req.body.cobSessionToken,
											req.body.userSessionToken, 
	function(message){
    	res.send(200, message);
  	});
});

router.post('/getItemSummaryForItem1', function(req, res){
	obj = api.getItemSummaryForItem1(req.body.cobSessionToken,
									req.body.userSessionToken, 
									req.body.itemId, 
									req.body.dex_startLevel, 
									req.body.dex_endLevel, 
									req.body.dex_extentLevels_0, 
									req.body.dex_extentLevels_1,
	function(message){
    	res.send(200, message);
  	});
});

module.exports = router;