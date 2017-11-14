<%@Master language="C#"%>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Import Namespace="Microsoft.SharePoint" %> <%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="wssuc" TagName="Welcome" src="~/_controltemplates/15/Welcome.ascx" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<SharePoint:SPHtmlTag dir="<%$Resources:wss,multipages_direction_dir_value%>" ID="SPHtmlTag" runat="server" >
<head runat="server">
	<meta name="GENERATOR" content="Microsoft SharePoint" />
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=10"/>
	<meta http-equiv="Expires" content="0" />
	<SharePoint:SPPinnedSiteTile runat="server" TileUrl="/_layouts/15/images/SharePointMetroAppTile.png" TileColor="#0072C6" />
	<SharePoint:RobotsMetaTag runat="server"/>
	<SharePoint:PageTitle runat="server">
		<asp:ContentPlaceHolder id="PlaceHolderPageTitle" runat="server">
			<SharePoint:ProjectProperty Property="Title" runat="server" />
		</asp:ContentPlaceHolder>
	</SharePoint:PageTitle>
	<SharePoint:SPShortcutIcon runat="server" IconUrl="/_layouts/15/images/favicon.ico?rev=23" />
	<SharePoint:StartScript runat="server" />
	<SharePoint:CssLink runat="server" Version="15"/>
	<SharePoint:CacheManifestLink runat="server"/>
	<SharePoint:ScriptLink language="javascript" name="core.js" OnDemand="true" runat="server" Localizable="false" />
	<SharePoint:ScriptLink language="javascript" name="menu.js" OnDemand="true" runat="server" Localizable="false" />
	<SharePoint:ScriptLink language="javascript" name="callout.js" OnDemand="true" runat="server" Localizable="false" />
	<SharePoint:ScriptLink language="javascript" name="sharing.js" OnDemand="true" runat="server" Localizable="false" />
	<SharePoint:ScriptLink language="javascript" name="suitelinks.js" OnDemand="true" runat="server" Localizable="false" />
	<SharePoint:CustomJSUrl runat="server" />
	<SharePoint:SoapDiscoveryLink runat="server" />
	<SharePoint:AjaxDelta id="DeltaPlaceHolderAdditionalPageHead" Container="false" runat="server">
		<asp:ContentPlaceHolder id="PlaceHolderAdditionalPageHead" runat="server" />
		<SharePoint:DelegateControl runat="server" ControlId="AdditionalPageHead" AllowMultipleControls="true" />
		<asp:ContentPlaceHolder id="PlaceHolderBodyAreaClass" runat="server" />
	</SharePoint:AjaxDelta>
	<SharePoint:CssRegistration Name="Themable/corev15.css" runat="server" />
	<link rel="stylesheet" type="text/css" href="/sites/Hcmunre/SiteAssets/Hcmunre/css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="/sites/Hcmunre/SiteAssets/Hcmunre/css/main.css" />
	<script src="/sites/Hcmunre/SiteAssets/Hcmunre/js/angular.min.js" type="text/javascript"></script>
	<script src="/sites/Hcmunre/SiteAssets/Hcmunre/js/jquery.js" type="text/javascript"></script> 
	<script src="/sites/Hcmunre/SiteAssets/Hcmunre/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="/sites/Hcmunre/SiteAssets/Hcmunre/js/xls.core2.min.js" type="text/javascript"></script>  
	<script src="/sites/Hcmunre/SiteAssets/Hcmunre/js/xlsx.core.min.js" type="text/javascript"></script> 
	<script src="/sites/Hcmunre/SiteAssets/Hcmunre/js/upload.js" type="text/javascript"></script> 

	<link rel="stylesheet" type="text/css" href="/sites/Hcmunre/SiteAssets/Hcmunre/css/font-awesome.css" />

</head>
<body>
  <SharePoint:ImageLink runat="server"/>
  <SharePoint:SPNoScript runat="server"/>
  <SharePoint:SPClientIDGenerator runat="server" ServerControlID="DeltaPlaceHolderMain;DeltaPlaceHolderPageTitleInTitleArea;DeltaPlaceHolderUtilityContent" />
  <SharePoint:SharePointForm runat="server" onsubmit="if (typeof(_spFormOnSubmitWrapper) != 'undefined') {return _spFormOnSubmitWrapper();} else {return true;}">
	<script type="text/javascript"> var submitHook = function () { return false; }; theForm._spOldSubmit = theForm.submit; theForm.submit = function () { if (!submitHook()) { this._spOldSubmit(); } }; </script>
	<SharePoint:AjaxDelta id="DeltaSPWebPartManager" runat="server">
		<WebPartPages:SPWebPartManager runat="Server"/>
	</SharePoint:AjaxDelta>
	<asp:ScriptManager id="ScriptManager" runat="server" EnablePageMethods="false" EnablePartialRendering="true" EnableScriptGlobalization="false" EnableScriptLocalization="true" />
	<SharePoint:AjaxDelta id="DeltaDelegateControls" runat="server">
		<SharePoint:DelegateControl runat="server" ControlId="GlobalNavigation" />
		<SharePoint:DelegateControl ControlId="GlobalSiteLink3" Scope="Farm" runat="server" Visible="false" />
	</SharePoint:AjaxDelta>
<div id="TurnOnAccessibility" style="display:none" class="s4-notdlg noindex">
	<a id="linkTurnOnAcc" href="#" class="ms-accessible ms-acc-button" onclick="SetIsAccessibilityFeatureEnabled(true);UpdateAccessibilityUI();document.getElementById('linkTurnOffAcc').focus();return false;">
	<SharePoint:EncodedLiteral runat="server" text="<%$Resources:wss,master_turnonaccessibility%>" EncodeMethod="HtmlEncode"/></a>
</div>
<div id="TurnOffAccessibility" style="display:none" class="s4-notdlg noindex">
	<a id="linkTurnOffAcc" href="#" class="ms-accessible ms-acc-button" onclick="SetIsAccessibilityFeatureEnabled(false);UpdateAccessibilityUI();document.getElementById('linkTurnOnAcc').focus();return false;">
	<SharePoint:EncodedLiteral runat="server" text="<%$Resources:wss,master_turnoffaccessibility%>" EncodeMethod="HtmlEncode"/></a>
</div>
<div class="s4-notdlg s4-skipribbonshortcut noindex">
	<a href="javascript:;" onclick="document.getElementById('startNavigation').focus();" class="ms-accessible ms-acc-button" accesskey="<%$Resources:wss,skipribbon_accesskey%>" runat="server">
	<SharePoint:EncodedLiteral runat="server" text="<%$Resources:wss,skipRibbonCommandsLink%>" EncodeMethod="HtmlEncode"/></a>
</div>
<div class="s4-notdlg noindex">
	<a href="javascript:;" onclick="document.getElementById('mainContent').focus();" class="ms-accessible ms-acc-button" runat="server">
	<SharePoint:EncodedLiteral runat="server" text="<%$Resources:wss,mainContentLink%>" EncodeMethod="HtmlEncode"/></a>
</div>
<div id="TurnOffAnimation" style="display:none;" class="s4-notdlg noindex">
	<a id="linkTurnOffAnimation" href="#" class="ms-accessible ms-acc-button" onclick="ToggleAnimationStatus();return false;">
	<SharePoint:EncodedLiteral runat="server" text="<%$Resources:wss,master_disableanimation%>" EncodeMethod="HtmlEncode"/></a>
</div>
<div id="TurnOnAnimation" style="display:none;" class="s4-notdlg noindex">
	<a id="linkTurnOnAnimation" href="#" class="ms-accessible ms-acc-button" onclick="ToggleAnimationStatus();return false;">
	<SharePoint:EncodedLiteral runat="server" text="<%$Resources:wss,master_enableanimation%>" EncodeMethod="HtmlEncode"/></a>
</div>
<a id="HiddenAnchor" href="javascript:;" style="display:none;"></a>
<div id="suiteBar" class="ms-dialogHidden noindex">
	<div id="suiteBarLeft">
		<div class="ms-table ms-fullWidth">
			<div class="ms-tableRow">
				<div class="ms-tableCell ms-verticalAlignMiddle">
					<SharePoint:DelegateControl id="ID_SuiteBarBrandingDelegate" ControlId="SuiteBarBrandingDelegate" runat="server"/>
				</div>
				<SharePoint:AjaxDelta runat="server" id="DeltaSuiteLinks" BlockElement="true" CssClass="ms-core-deltaSuiteLinks">
						<div id="suiteLinksBox">
							<SharePoint:DelegateControl id="ID_SuiteLinksDelegate" ControlId="SuiteLinksDelegate" runat="server" />
						</div>
				</SharePoint:AjaxDelta>
			</div>
		</div>
	</div>
	<div id="suiteBarRight">
		<SharePoint:AjaxDelta runat="server" id="DeltaSuiteBarRight" CssClass="ms-core-deltaSuiteBarRight" BlockElement="true">
				<div id="welcomeMenuBox">
  <wssuc:Welcome id="IdWelcome" runat="server" EnableViewState="false" />
				</div>
				<div id="suiteBarButtons">
					   <span class="ms-siteactions-root" id="siteactiontd">
					   <SharePoint:SiteActions runat="server" accesskey="<%$Resources:wss,tb_SiteActions_AK%>" id="SiteActionsMenuMain"
						PrefixHtml=""
						SuffixHtml=""
						ImageUrl="/_layouts/15/images/spcommon.png?rev=23"
						ThemeKey="spcommon"
						MenuAlignment="Right"
						MenuNotVisibleHtml="&amp;nbsp;"
						LargeIconMode="false"
						>
						<CustomTemplate>
						<SharePoint:FeatureMenuTemplate runat="server"
							FeatureScope="Site"
							Location="Microsoft.SharePoint.StandardMenu"
							GroupId="SiteActions"
							UseShortId="true"
							>
						  <SharePoint:MenuItemTemplate runat="server"
							  id="MenuItem_ShareThisSite"
							  Text="<%$Resources:wss,siteactions_sharethissite%>"
							  Description="<%$Resources:wss,siteactions_sharethissitedescription%>"
							  MenuGroupId="100"
							  Sequence="110"
							  UseShortId="true"
							  PermissionsString="ViewPages"
							  PermissionMode="Any" />
						  <SharePoint:MenuItemTemplate runat="server" id="MenuItem_EditPage"
							  Text="<%$Resources:wss,siteactions_editpage15%>"
							  Description="<%$Resources:wss,siteactions_editpagedescriptionv4%>"
							  ImageUrl="/_layouts/15/images/ActionsEditPage.png?rev=23"
							  MenuGroupId="200"
							  Sequence="210"
							  PermissionsString="EditListItems"
							  ClientOnClickNavigateUrl="javascript:ChangeLayoutMode(false);" />
						  <SharePoint:MenuItemTemplate runat="server" id="MenuItem_CreatePage"
							  Text="<%$Resources:wss,siteactions_addpage15%>"
							  Description="<%$Resources:wss,siteactions_createpagedesc%>"
							  ImageUrl="/_layouts/15/images/NewContentPageHH.png?rev=23"
							  MenuGroupId="200"
							  Sequence="220"
							  UseShortId="true"
							  ClientOnClickScriptContainingPrefixedUrl="OpenCreateWebPageDialog('~siteLayouts/createwebpage.aspx')"
							  PermissionsString="AddListItems, EditListItems"
							  PermissionMode="All" />
						  <SharePoint:MenuItemTemplate runat="server" id="MenuItem_Create"
							  Text="<%$Resources:wss,siteactions_addapp15%>"
							  Description="<%$Resources:wss,siteactions_createdesc%>"
							  MenuGroupId="200"
							  Sequence="230"
							  UseShortId="true"
							  ClientOnClickScriptContainingPrefixedUrl="GoToPage('~siteLayouts/addanapp.aspx')"
							  PermissionsString="ManageLists, ManageSubwebs"
							  PermissionMode="Any" />
						  <SharePoint:MenuItemTemplate runat="server" id="MenuItem_ViewAllSiteContents"
							  Text="<%$Resources:wss,quiklnch_allcontent_15%>"
							  Description="<%$Resources:wss,siteactions_allcontentdescription%>"
							  ImageUrl="/_layouts/15/images/allcontent32.png?rev=23"
							  MenuGroupId="200"
							  Sequence="240"
							  UseShortId="true"
							  ClientOnClickNavigateUrl="~siteLayouts/viewlsts.aspx"
							  PermissionsString="ViewFormPages"
							  PermissionMode="Any" />
						  <SharePoint:MenuItemTemplate runat="server" id="MenuItem_ChangeTheLook"
							  Text="<%$Resources:wss,siteactions_changethelook15%>"
							  Description="<%$Resources:wss,siteactions_changethelookdesc15%>"
							  MenuGroupId="300"
							  Sequence="310"
							  UseShortId="true"
							  ClientOnClickNavigateUrl="~siteLayouts/designgallery.aspx"
							  PermissionsString="ApplyThemeAndBorder,ApplyStyleSheets,Open,ViewPages,OpenItems,ViewListItems"
							  PermissionMode="All" />
						  <SharePoint:MenuItemTemplate runat="server" id="MenuItem_Settings"
							  Text="<%$Resources:wss,siteactions_settings15%>"
							  Description="<%$Resources:wss,siteactions_sitesettingsdescriptionv4%>"
							  ImageUrl="/_layouts/15/images/settingsIcon.png?rev=23"
							  MenuGroupId="300"
							  Sequence="320"
							  UseShortId="true"
							  ClientOnClickScriptContainingPrefixedUrl="GoToPage('~siteLayouts/settings.aspx')"
							  PermissionsString="EnumeratePermissions,ManageWeb,ManageSubwebs,AddAndCustomizePages,ApplyThemeAndBorder,ManageAlerts,ManageLists,ViewUsageData"
							  PermissionMode="Any" />
						  <SharePoint:MenuItemTemplate runat="server" id="MenuItem_SwitchToMobileView"
							  Visible="false"
							  Text="<%$Resources:wss,siteactions_switchtomobileview%>"
							  Description="<%$Resources:wss,siteactions_switchtomobileviewdesc%>"
							  MenuGroupId="300"
							  Sequence="330"
							  UseShortId="true"
							  ClientOnClickScript="var mswlh = window.location.href; if (mswlh.indexOf('?')==-1) { window.location = mswlh + '?mobile=1'; } else { window.location = mswlh + '&mobile=1'; }" />
						</SharePoint:FeatureMenuTemplate>
						</CustomTemplate>
					  </SharePoint:SiteActions></span>
<span id="ms-help">
	<SharePoint:ThemedClusteredHoverImage
		runat="server"
		ID="TopHelpLink"
		ThemeKey="spintl"
		TouchMode="true"
		TouchModeWidth="30"
		TouchModeHeight="30"
		TouchModePaddingTop="7"
		TouchModePaddingRight="7"
		TouchModePaddingBottom="7"
		TouchModePaddingLeft="7"
		ImageUrl="/_layouts/15/~lcid/images/spintl.png"
		Width="16"
		Height="16"
		OffsetX="19"
		OffsetY="1"
		HoverOffsetX="1"
		HoverOffsetY="1"
		NavigateUrl="#"
		onclick="TopHelpButtonClick('HelpHome',event);return false"
		AlternateText="<%$Resources:wss,multipages_helplink_text%>"
		AccessKey="<%$Resources:wss,multipages_helplink_accesskey%>"
		ToolTip="<%$Resources:wss,multipages_helplink_text%>" />
</span>
				</div>
		</SharePoint:AjaxDelta>
	</div>
</div>
		<div id="ms-hcTest"></div>
		<div id="s4-ribbonrow">
		<div id="globalNavBox" class="noindex">
<div id="ribbonBox">
	<div id="s4-ribboncont">
		<SharePoint:AjaxDelta id="DeltaSPRibbon" BlockElement="true" runat="server">
			<SharePoint:DelegateControl runat="server" ID="GlobalDelegate0" ControlId="GlobalSiteLink0" />
			<SharePoint:SPRibbon
				runat="server"
				PlaceholderElementId="RibbonContainer"
				CssFile="" >
				<SharePoint:SPRibbonPeripheralContent
					runat="server"
					CssClass="ms-core-defaultFont ms-dialogHidden"
					Location="TabRowLeft">
				</SharePoint:SPRibbonPeripheralContent>
				<SharePoint:SPRibbonPeripheralContent
					runat="server"
					Location="TabRowRight"
					ID="RibbonTabRowRight"
					CssClass="s4-trc-container s4-notdlg ms-core-defaultFont">
					<SharePoint:SPSharePromotedActionButton runat="server"/>
					<SharePoint:DelegateControl runat="server" ControlId="PromotedActions" AllowMultipleControls="true" />
					<SharePoint:SPSyncPromotedActionButton runat="server"/>
					<SharePoint:PageStateActionButton id="PageStateActionButton" runat="server" Visible="false" />
<span id="fullscreenmodebox" class="ms-qatbutton">
	<span id="fullscreenmode">
		<SharePoint:ThemedClusteredHoverImage
			runat="server"
			ID="fullscreenmodeBtn"
			ThemeKey="spcommon"
			TouchMode="true"
			TouchModeWidth="30"
			TouchModeHeight="30"
			TouchModePaddingLeft="7"
			TouchModePaddingTop="7"
			TouchModePaddingRight="7"
			TouchModePaddingBottom="7"
			ImageUrl="/_layouts/15/images/spcommon.png?rev=23"
			Width="16"
			Height="16"
			OffsetX="143"
			OffsetY="178"
			HoverOffsetX="125"
			HoverOffsetY="178"
			NavigateUrl="#"
			onclick="SetFullScreenMode(true);PreventDefaultNavigation();return false;"
			AlternateText="<%$Resources:wss,multipages_fullscreenmodelinkalt_text%>"
			ToolTip="<%$Resources:wss,multipages_fullscreenmodelinkalt_text%>"
			/>
	</span>
	<span id="exitfullscreenmode" style="display: none;">
		<SharePoint:ThemedClusteredHoverImage
			runat="server"
			ID="exitfullscreenmodeBtn"
			ThemeKey="spcommon"
			TouchMode="true"
			TouchModeWidth="30"
			TouchModeHeight="30"
			TouchModePaddingLeft="7"
			TouchModePaddingTop="7"
			TouchModePaddingRight="7"
			TouchModePaddingBottom="7"
			ImageUrl="/_layouts/15/images/spcommon.png?rev=23"
			Width="16"
			Height="16"
			OffsetX="107"
			OffsetY="178"
			HoverOffsetX="179"
			HoverOffsetY="96"
			NavigateUrl="#"
			onclick="SetFullScreenMode(false);PreventDefaultNavigation();return false;"
			AlternateText="<%$Resources:wss,multipages_fullscreenmodelinkalt_text%>"
			ToolTip="<%$Resources:wss,multipages_fullscreenmodelinkalt_text%>"
			/>
	</span>
</span>
<SharePoint:DeveloperDashboard runat="server" />
<SharePoint:DeveloperDashboardLauncher
	ID="DeveloperDashboardLauncher"
	ThemeKey="spcommon"
	TouchMode="true"
	TouchModeWidth="30"
	TouchModeHeight="30"
	TouchModePaddingLeft="7"
	TouchModePaddingTop="7"
	TouchModePaddingRight="7"
	TouchModePaddingBottom="7"
	NavigateUrl="javascript:return false"
	OnClick="ToggleDeveloperDashboard(window.g_ddHostBase);return false"
	OuterCssClass="ms-dd-button ms-qatbutton"
	runat="server"
	ImageUrl="/_layouts/15/images/spcommon.png?rev=23"
	AlternateText="<%$Resources:wss,multipages_launchdevdashalt_text%>"
	ToolTip="<%$Resources:wss,multipages_launchdevdashalt_text%>"
	OffsetX="145"
	OffsetY="196"
	HoverOffsetX="163"
	HoverOffsetY="196"
	Height="16"
	Width="16" />
				</SharePoint:SPRibbonPeripheralContent>
			</SharePoint:SPRibbon>
		</SharePoint:AjaxDelta>
	</div>
	<SharePoint:AjaxDelta id="DeltaSPNavigation" runat="server">
		<asp:ContentPlaceHolder ID="SPNavigation" runat="server">
			<SharePoint:DelegateControl runat="server" ControlId="PublishingConsole" Id="PublishingConsoleDelegate" />
		</asp:ContentPlaceHolder>
	</SharePoint:AjaxDelta>
</div>
<SharePoint:AjaxDelta id="DeltaWebPartAdderUpdatePanelContainer" BlockElement="true" CssClass="ms-core-webpartadder" runat="server">
  <div id="WebPartAdderUpdatePanelContainer">
	<asp:UpdatePanel
		ID="WebPartAdderUpdatePanel"
		UpdateMode="Conditional"
		ChildrenAsTriggers="false"
		runat="server">
	  <ContentTemplate>
		<WebPartPages:WebPartAdder ID="WebPartAdder" runat="server" />
		</ContentTemplate>
	  <Triggers>
		<asp:PostBackTrigger ControlID="WebPartAdder" />
	  </Triggers>
	</asp:UpdatePanel>
  </div>
</SharePoint:AjaxDelta>
		</div>
		</div>
		<div id="s4-workspace" class="ms-core-overlay">
		<div id="s4-bodyContainer">
		<div id="s4-titlerow"
			class="ms-dialogHidden s4-titlerowhidetitle">
		<div id="titleAreaBox"
			class="ms-noList ms-table ms-core-tableNoSpace">
		<div id="titleAreaRow"
			class="ms-tableRow">
<div id="siteIcon" class="ms-tableCell ms-verticalAlignTop">
	<SharePoint:AjaxDelta id="DeltaSiteLogo" BlockElement="true" runat="server">
		<SharePoint:SPSimpleSiteLink CssClass="ms-siteicon-a" runat="server" id="onetidProjectPropertyTitleGraphic" >
			<SharePoint:SiteLogoImage CssClass="ms-siteicon-img" name="onetidHeadbnnr0" id="onetidHeadbnnr2" LogoImageUrl="/_layouts/15/images/siteIcon.png?rev=23" runat="server"/>
		</SharePoint:SPSimpleSiteLink>
	</SharePoint:AjaxDelta>
</div>
			<div class="ms-breadcrumb-box ms-tableCell ms-verticalAlignTop">
				<div
					class="ms-breadcrumb-top">
<div class="ms-breadcrumb-dropdownBox" style="display:none;">
<SharePoint:AjaxDelta id="DeltaBreadcrumbDropdown" runat="server">
	<SharePoint:PopoutMenu
		Visible="false"
		runat="server"
		ID="GlobalBreadCrumbNavPopout"
		IconUrl="/_layouts/15/images/spcommon.png?rev=23"
		IconAlt="<%$Resources:wss,master_breadcrumbIconAlt%>"
		ThemeKey="v15breadcrumb"
		IconOffsetX="215"
		IconOffsetY="120"
		IconWidth="16"
		IconHeight="16"
		AnchorCss="ms-breadcrumb-anchor"
		AnchorOpenCss="ms-breadcrumb-anchor-open"
		MenuCss="ms-breadcrumb-menu ms-noList">
		<div class="ms-breadcrumb-top">
			<asp:Label runat="server" CssClass="ms-breadcrumb-header" Text="<%$Resources:wss,master_breadcrumbHeader%>" />
		</div>
		<asp:ContentPlaceHolder id="PlaceHolderTitleBreadcrumb" runat="server">
		<SharePoint:ListSiteMapPath
				runat="server"
				SiteMapProviders="SPSiteMapProvider,SPContentMapProvider"
				RenderCurrentNodeAsLink="false"
				PathSeparator=""
				CssClass="ms-breadcrumb"
				NodeStyle-CssClass="ms-breadcrumbNode"
				CurrentNodeStyle-CssClass="ms-breadcrumbCurrentNode"
				RootNodeStyle-CssClass="ms-breadcrumbRootNode"
				NodeImageOffsetX="217"
				NodeImageOffsetY="210"
				NodeImageWidth="16"
				NodeImageHeight="16"
				NodeImageUrl="/_layouts/15/images/spcommon.png?rev=23"
				RTLNodeImageOffsetX="199"
				RTLNodeImageOffsetY="210"
				RTLNodeImageWidth="16"
				RTLNodeImageHeight="16"
				RTLNodeImageUrl="/_layouts/15/images/spcommon.png?rev=23"
				HideInteriorRootNodes="true"
				SkipLinkText="" />
				</asp:ContentPlaceHolder>
	</SharePoint:PopoutMenu>
</SharePoint:AjaxDelta>
</div>
<SharePoint:AjaxDelta id="DeltaTopNavigation" BlockElement="true" CssClass="ms-displayInline ms-core-navigation" role="navigation" runat="server">
	<SharePoint:DelegateControl runat="server" ControlId="TopNavigationDataSource" Id="topNavigationDelegate">
		<Template_Controls>
			<asp:SiteMapDataSource
				ShowStartingNode="False"
				SiteMapProvider="SPNavigationProvider"
				id="topSiteMap"
				runat="server"
				StartingNodeUrl="sid:1002"/>
		</Template_Controls>
	</SharePoint:DelegateControl>
	<asp:ContentPlaceHolder id="PlaceHolderTopNavBar" runat="server">
		<SharePoint:AspMenu
			ID="TopNavigationMenu"
			Runat="server"
			EnableViewState="false"
			DataSourceID="topSiteMap"
			AccessKey="<%$Resources:wss,navigation_accesskey%>"
			UseSimpleRendering="true"
			UseSeparateCss="false"
			Orientation="Horizontal"
			StaticDisplayLevels="2"
			AdjustForShowStartingNode="true"
			MaximumDynamicDisplayLevels="2"
			SkipLinkText="" />
	</asp:ContentPlaceHolder>
</SharePoint:AjaxDelta>
				</div>
<h1 id="pageTitle" class="ms-core-pageTitle">
  <SharePoint:AjaxDelta id="DeltaPlaceHolderPageTitleInTitleArea" runat="server">
	<asp:ContentPlaceHolder id="PlaceHolderPageTitleInTitleArea" runat="server">
		<SharePoint:SPTitleBreadcrumb
			  runat="server"
			  RenderCurrentNodeAsLink="true"
				  SiteMapProvider="SPContentMapProvider"
			  CentralAdminSiteMapProvider="SPXmlAdminContentMapProvider">
		<PATHSEPARATORTEMPLATE>
		  <SharePoint:ClusteredDirectionalSeparatorArrow runat="server" />
		</PATHSEPARATORTEMPLATE>
	  </SharePoint:SPTitleBreadcrumb>
	</asp:ContentPlaceHolder>
  </SharePoint:AjaxDelta>
  <SharePoint:AjaxDelta BlockElement="true" id="DeltaPlaceHolderPageDescription" CssClass="ms-displayInlineBlock ms-normalWrap" runat="server">
	<a href="javascript:;" id="ms-pageDescriptionDiv" style="display:none;">
	  <span id="ms-pageDescriptionImage">&#160;</span>
	</a>
	<span class="ms-accessible" id="ms-pageDescription">
	  <asp:ContentPlaceHolder id="PlaceHolderPageDescription" runat="server" />
	</span>
	<SharePoint:ScriptBlock runat="server">
	  _spBodyOnLoadFunctionNames.push("setupPageDescriptionCallout");
	</SharePoint:ScriptBlock>
  </SharePoint:AjaxDelta>
</h1>
			</div>
			<div class="ms-tableCell ms-verticalAlignTop">
<SharePoint:AjaxDelta id="DeltaPlaceHolderSearchArea" BlockElement="true" CssClass="ms-mpSearchBox ms-floatRight" runat="server">
  <asp:ContentPlaceHolder id="PlaceHolderSearchArea" runat="server">
	<div id="searchInputBox">
	  <SharePoint:DelegateControl runat="server" ControlId="SmallSearchInputBox" />
	</div>
  </asp:ContentPlaceHolder>
</SharePoint:AjaxDelta>
			</div>
		</div>
		</div>
		</div>
		<div id="contentRow">
<div id="sideNavBox"
	 class="ms-dialogHidden ms-forceWrap ms-noList">
  <SharePoint:AjaxDelta id="DeltaPlaceHolderLeftNavBar" BlockElement="true" CssClass="ms-core-navigation" role="navigation" runat="server">
	<asp:ContentPlaceHolder id="PlaceHolderLeftNavBar" runat="server">
				<a id="startNavigation" name="startNavigation" tabIndex="-1"></a>
				<asp:ContentPlaceHolder id="PlaceHolderLeftNavBarTop" runat="server" />
				<asp:ContentPlaceHolder id="PlaceHolderQuickLaunchTop" runat="server" />
				<asp:ContentPlaceHolder id="PlaceHolderLeftNavBarDataSource" runat="server" />
				<asp:ContentPlaceHolder id="PlaceHolderCalendarNavigator" runat="server" />
				<asp:ContentPlaceHolder id="PlaceHolderLeftActions" runat="server" />
				<div class="ms-core-sideNavBox-removeLeftMargin">
				<SharePoint:SPNavigationManager
					id="QuickLaunchNavigationManager"
					runat="server"
					QuickLaunchControlId="V4QuickLaunchMenu"
					ContainedControl="QuickLaunch"
					EnableViewState="false"
					>
					<SharePoint:DelegateControl runat="server" ControlId="QuickLaunchDataSource">
					
					
					
					
					
					
					
					
					
						<Template_Controls>
							<asp:SiteMapDataSource SiteMapProvider="SPNavigationProvider" ShowStartingNode="False" id="QuickLaunchSiteMap" StartingNodeUrl="sid:1025" runat="server" />
						</Template_Controls>
					</SharePoint:DelegateControl>
					<SharePoint:AspMenu id="V4QuickLaunchMenu" runat="server" EnableViewState="false" DataSourceId="QuickLaunchSiteMap" UseSimpleRendering="true" Orientation="Vertical" StaticDisplayLevels="3" AdjustForShowStartingNode="true" MaximumDynamicDisplayLevels="0" SkipLinkText="" />
				</SharePoint:SPNavigationManager>
					<SharePoint:SPNavigationManager
						id="TreeViewNavigationManagerV4"
						runat="server"
						ContainedControl="TreeView"
						CssClass="ms-tv-box"
					>
						<SharePoint:SPLinkButton runat="server" NavigateUrl="~site/_layouts/15/viewlsts.aspx" id="idNavLinkSiteHierarchyV4" Text="<%$Resources:wss,treeview_header%>" accesskey="<%$Resources:wss,quiklnch_allcontent_AK%>"
						CssClass="ms-tv-header" />
							<SharePoint:DelegateControl runat="server" ControlId="TreeViewAndDataSource">
								<Template_Controls>
								<SharePoint:SPHierarchyDataSourceControl
									runat="server"
									id="TreeViewDataSourceV4"
									RootContextObject="Web"
									IncludeDiscussionFolders="true"
								/>
								<SharePoint:SPRememberScroll runat="server" id="TreeViewRememberScrollV4" onscroll="javascript:_spRecordScrollPositions(this);"
									style="overflow: auto;">
									<SharePoint:SPTreeView
									id="WebTreeViewV4"
									runat="server"
									ShowLines="false"
									DataSourceId="TreeViewDataSourceV4"
									ExpandDepth="0"
									SelectedNodeStyle-CssClass="ms-tv-selected"
									NodeStyle-CssClass="ms-tv-item"
									SkipLinkText=""
									NodeIndent="12"
									ExpandImageUrl="/_layouts/15/images/tvclosed.png?rev=23"
									ExpandImageUrlRtl="/_layouts/15/images/tvclosedrtl.png?rev=23"
									CollapseImageUrl="/_layouts/15/images/tvopen.png?rev=23"
									CollapseImageUrlRtl="/_layouts/15/images/tvopenrtl.png?rev=23"
									NoExpandImageUrl="/_layouts/15/images/tvblank.gif?rev=23"
									>
									</SharePoint:SPTreeView>
								</SharePoint:SPRememberScroll>
								</Template_Controls>
							</SharePoint:DelegateControl>
					</SharePoint:SPNavigationManager>
				<asp:ContentPlaceHolder id="PlaceHolderQuickLaunchBottom" runat="server">
					<div class="ms-core-listMenu-verticalBox">
						<SharePoint:ClusteredSPLinkButton
							runat="server"
							id="idNavLinkViewAll"
							PermissionsString="ViewFormPages"
							NavigateUrl="~site/_layouts/15/viewlsts.aspx"
							Text="<%$Resources:wss,AllSiteContentMore%>"
							accesskey="<%$Resources:wss,quiklnch_allcontent_AK%>"
							CssClass="ms-core-listMenu-item ms-core-listMenu-heading" />
					</div>
				</asp:ContentPlaceHolder>
				</div>
	</asp:ContentPlaceHolder>
  </SharePoint:AjaxDelta>
</div>
<div id="contentBox"
 aria-live="polite" aria-relevant="all">
  <div id="notificationArea" class="ms-notif-box"></div>
	<SharePoint:AjaxDelta id="DeltaPageStatusBar" BlockElement="true" runat="server">
		<div id="pageStatusBar"></div>
	</SharePoint:AjaxDelta>
	<SharePoint:AjaxDelta id="DeltaPlaceHolderMain" BlockElement="true" IsMainContent="true" runat="server">
		<a id="mainContent" name="mainContent" tabindex="-1"></a>
		<asp:ContentPlaceHolder id="PlaceHolderMain" runat="server" />
	</SharePoint:AjaxDelta>
</div>
<span class="clearfix"></span>
<section id="footer">
	<div class="container">
		<div class="row">
			<div class="col-sm-6">
				<img class="img-fluid" src="http://win-kqb8o4aijpr/sites/Hcmunre/SiteAssets/logo.png" alt="">
			</div>
			<div class="col-sm-6  ">
				<div class="dia_chi pull-right">
					<p>236B Lê Văn Sỹ, Phường 1, Quận Tân Bình, TP. Hồ Chí Minh <br/> Điện thoại: 08.38443006   Fax: 08.38449474</p>
					<div class="xa_hoi">
						<a href="https://www.facebook.com/pages/hcmunreeduvn/432610130222668?fref=ts" title="">
							<i class="fa fa-facebook fa-fw "></i>
						</a>
						<a href="" title="">
							<i class="fa fa-google-plus fa-fw "></i>
						</a>
						<a href="" title="">
							<i class="fa fa-twitter fa-fw  "></i>
						</a>
						<a href="" title="">
							<i class="fa fa-linkedin fa-fw   "></i>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
<SharePoint:AjaxDelta id="DeltaFormDigest" BlockElement="true" runat="server">
	<asp:ContentPlaceHolder id="PlaceHolderFormDigest" runat="server">
		<SharePoint:FormDigest runat="server"/>
	</asp:ContentPlaceHolder>
</SharePoint:AjaxDelta>
<asp:ContentPlaceHolder id="PlaceHolderSiteName" runat="server" Visible="false" />
<asp:ContentPlaceHolder id="PlaceHolderHorizontalNav" runat="server" Visible="false" />
<asp:ContentPlaceHolder id="PlaceHolderPageImage" runat="server" Visible="false" />
<asp:ContentPlaceHolder id="PlaceHolderTitleLeftBorder" runat="server" Visible="false" />
<asp:ContentPlaceHolder id="PlaceHolderMiniConsole" runat="server" Visible="false" />
<asp:ContentPlaceHolder id="PlaceHolderTitleRightMargin" runat="server" Visible="false" />
<asp:ContentPlaceHolder id="PlaceHolderTitleAreaSeparator" runat="server" Visible="false" />
<asp:ContentPlaceHolder id="PlaceHolderNavSpacer" runat="server" Visible="false" />
<asp:ContentPlaceHolder id="PlaceHolderLeftNavBarBorder" runat="server" Visible="false" />
<asp:ContentPlaceHolder id="PlaceHolderBodyLeftBorder" runat="server" Visible="false" />
<asp:ContentPlaceHolder id="PlaceHolderBodyRightMargin" runat="server" Visible="false" />
<asp:ContentPlaceHolder id="PlaceHolderTitleAreaClass" runat="server" Visible="false" />
<asp:ContentPlaceHolder id="PlaceHolderGlobalNavigation" runat="server" Visible="false" />
<asp:ContentPlaceHolder id="PlaceHolderGlobalNavigationSiteMap" runat="server" Visible="false" />
<asp:ContentPlaceHolder id="WSSDesignConsole" runat="server" Visible="false" />
		</div>
		</div>
		</div>
</SharePoint:SharePointForm>
	<SharePoint:AjaxDelta id="DeltaPlaceHolderUtilityContent" runat="server">
		<asp:ContentPlaceHolder id="PlaceHolderUtilityContent" runat="server"/>
	</SharePoint:AjaxDelta>
	<SharePoint:ScriptBlock runat="server">
		var g_Workspace = "s4-workspace";
	</SharePoint:ScriptBlock>
</body>
</SharePoint:SPHtmlTag>
