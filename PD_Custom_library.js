/// <reference path="XrmPageTemplate.js" />
/// <reference path="json2.js" />
/// <reference path="jquery.js" />

/**
* MSCRM 2011 Web Service Toolkit for JavaScript
* @author Jaimie Ji
* @author David Berry
* @current version : 2.2

* Credits:
*   The idea of this library was inspired by Daniel Cai's CrmWebServiceToolkit.
*   The idea of BusinessEntity was inspired by Daniel Cai && Ascentium CrmService JavaScript Library.
*   The REST Endpoint functions were inspired by MSCRM 2011 SDK JavaScript code and various resources from CRM websites and forums. Some of them were just copies with minor modification.
*   The Soap functions were inspired by Daniel Cai && Jamie Miley && Paul Way && Customer Effective.
*   Additional thanks to all contributors of MSCRM and i have learned a lot from you all.
* Date: February, 2012
*
* Special Thanks:
*   JetBrains ReSharper Open License
* Date: July, 2012
*
* What's new:
**********************************************************************************************************
*   Version: 1.1
*   Date: April, 2012
*       Dependency: JSON2
*       New Function - XrmServiceToolkit.Soap.Assign
*       New Function - XrmServiceToolkit.Soap.GrantAccess
*       New Function - XrmServiceToolkit.Soap.ModifyAccess
*       New Function - XrmServiceToolkit.Soap.GrantAccess
*       New Function - XrmServiceToolkit.Soap.RetrievePrincipalAccess
**********************************************************************************************************
*   Version: 1.2
*   Date: April, 2012
*       Dependency: JSON2
*       New Fix - Fix soaps functions to create/update/retrieve activities with Party List fields.
**********************************************************************************************************
*   Version: 1.3
*   Date: July, 2012
*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
*       New Feature: cross browser support. jQuery Integration.
*       New Extension: A new category of functions to extend some functions:
*          1. JQueryXrmDependentOptionSet: Create Configurable Dependent Option Set to utilize CRM 2011 web resource.
*          2. JQueryXrmFieldTooltip: Create configurable tooltip for fields on CRM 2011 form
*          3. JQueryXrmCustomFilterView: Create configurable ability to add custom filter view to crm 2011 lookup field on the form
*          4. JQueryXrmFormatNotesControl: Format the notes control to allow insert, allow edit
**********************************************************************************************************
*   Version: 1.3.1
*   Date: November, 2012
*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
*       New Feature - A change of logic to increase performance when returning large number of records
*       New Function - XrmServiceToolkit.Soap.QueryAll: Return all available records by query options (>5k+)
*       New Fix - XrmServiceToolkit.Rest.RetrieveMultiple not returning records more than 50
*       New Fix - XrmServiceToolkit.Soap.Business error when referring number fields like (int, double, float)     
*       New Fix - XrmServiceToolkit.Soap not handling error message properly
**********************************************************************************************************
*   Version: 1.3.2
*   Date: January, 2013
*       Dependency: JSON2, jQuery (latest or 1.7.2 above)  
*       New Fix - XrmServiceToolkit.Soap cross browser support to initialize soap service
**********************************************************************************************************
*   Version: 1.4.0 
*   Date: January, 2013
*       Dependency: JSON2, jQuery (latest or 1.7.2 above)  
*       Feature: Add Cross Browser Support for RU12
*       Tested Platform: IE9, IE10, Chrome Version 24.0.1312.56 m, Firefox 18.0.1
**********************************************************************************************************
*   Version: 1.4.1
*   Date: April, 2013
*       Dependency: JSON2, jQuery (latest or 1.7.2 above)  
*       Tested Platform: IE9, IE10, Chrome Version 26.0.1410.64 m, Firefox 20.0.1
*       Feature: Add Cross Browser Support for RU12, RU13
*       New Fix - XrmServiceToolkit.Common.AddNotification method updated for RU12, RU13, still compatible for RU11 below
*       New Fix - XrmServiceToolkit.Soap.Fetch method did not format linked record correctly
*       New Fix - XrmServiceToolkit.Soap.Retrieve method did not return partylist data for activity
*       New Fix - Added manual conversion from String to Date conversion for cross browser
*       New Fix - getServerUrl method is updated as getClientUrl to align with RU12 SDK method getClientUrl(), still compatible to support RU11 below
*       New Function - getServerUrl private method is updated as getClientUrl to align with RU12 SDK method getClientUrl(), still compatible to support RU11 below
*       New Function - XrmServiceToolkit.Soap.RetrieveAllEntitiesMetadata method is a method to return all metadata for all entities by the specified entity filters
*       New Function - XrmServiceToolkit.Soap.RetrieveEntityMetadata method is a method to return the metadata for a certain entity by the specified entity filters
*       New Function - XrmServiceToolkit.Soap.RetrieveAttributeMetadata method is a method to return the metadata for a certain entity's attribute
**********************************************************************************************************
*   Version: 1.4.2 (beta)
*   Date: May, 2013
*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
*       Tested Platform: IE10
*       New Fix - XrmServiceToolkit.Soap.Fetch now takes an additional parameter, 'fetchAll', that when set to true will retrieve all pages of results
*       New Behaviour - XrmServiceToolkit.Soap.Fetch works best when providing a FetchXML string starting with the "entity" node, because of the way paging works;
*           It will still function with the traditional "fetch" node to start, but then the XML has to be parsed to select just the "entity" node, which adds some overhead.
*       New Behaviour - XrmServiceToolkit fetch and queryall methods use a unified model, and some redundant code has been removed.  This allows better paging operations.
*
**********************************************************************************************************
*   Version: 2.0.0 (beta)
*   Date: October, 2013
*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
*       ---NOTE---Due to the changes for CRM 2013, please use the attached version of JSON2 and jQuery
*       Tested Platform: IE10, latest Chrome, latest FireFox
*    Changes:
*       New Behaviour - XrmServiceTookit.Soap.Fetch parameters change to work with asynchronous callback compared to 1.4.2 beta: XrmServiceToolkit.Soap.Fetch(fetchXml, fetchAll, callback)
*       New Behaviour - XrmServiceTookit.Soap.AddNotification is working with CRM 2013 using the out-of-box functionality. Still support CRM 2011
*       New Fix - XrmServiceToolkit.Common.GetObjectCodeType is now using metadata retrieval as a supported method
*       New Fix - The included jQuery has a line changed at the bottom <window.jQuery = jQuery;> $ is removed to work with CRM 2013 form
*   Beta Release for CRM 2013
**********************************************************************************************************
*   Version: 2.0.1 (beta)
*   Date: April, 2014
*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
*       ---NOTE---Due to the changes for CRM 2013, please use the attached version of JSON2 and jQuery
*       Tested Platform: IE11, IE10, latest Chrome, latest FireFox
*    Changes:
*       New Behaviour - XrmServiceTookit.Soap.Fetch method will allow 'page' and 'count' parameter to limit the returned records.
*       New Fix - XrmServiceToolkit.Soap.Fetch fix an error when passing difference formats of Fetch XML with/without '<fetch>..' statements
*       New Fix - XrmServiceToolkit.Extension methods error when retrieving web resources
*   Beta Release for CRM 2013
**********************************************************************************************************
*   Version: 2.1
*   Date: September, 2014
*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
*       ---NOTE---Due to the changes for CRM 2013, please use the attached version of JSON2 and jQuery
*       Tested Platform: IE11, IE10, latest Chrome, latest FireFox
*    Changes:
*       Performance Refactor
*       New Fix - XrmServiceToolkit.Common.DisableAllControlsInTab to support CRM2013 changes
*   Beta Release for CRM 2013
**********************************************************************************************************
*   Version: 2.2
*   Date: April, 2015
*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
*       ---NOTE---Due to the changes for CRM 2013, please use the attached version of JSON2 and jQuery
*       Tested Platform: IE11, IE10, latest Chrome, latest FireFox
*    Changes:
*       CRM 2015 release
*       New Fix - Error Handling
*       New Fix - XrmServiceToolkit.Soap.Fetch aggregate fix
*       New Fix - XrmServiceToolkit.Soap.Fetch distinct support
*       New Fix - Aliased Values Handling
*   Beta Release for CRM 2013
**********************************************************************************************************
*/

XrmServiceToolkit = function () {
    /// <summary>
    /// XrmServiceToolkit.Common for common functions.
    /// XrmServiceToolkit.Rest for all REST endpoints functions.
    /// XrmServiceToolkit.Soap for all Soap functions.
    /// XrmServiceToolkit.Extension for all Extension functions.
    /// </summary>
};

XrmServiceToolkit.Common = function () {

    var alertMessage = function (message) {
        (Xrm.Utility !== undefined && Xrm.Utility.alertDialog !== undefined) ? Xrm.Utility.alertDialog(message) : alert(message);
    };

    var guidsAreEqual = function (guid1, guid2) {
        /// <summary>
        /// Check if two guids are equal
        /// </summary>
        /// <param name="guid1" type="string">
        /// A string represents a guid
        /// </param>
        /// <param name="guid2" type="string">
        /// A string represents a guid
        /// </param>
        /// <returns type="boolean" />
        var isEqual;
        if (guid1 === null || guid2 === null || guid1 === undefined || guid2 === undefined) {
            isEqual = false;
        }
        else {
            isEqual = guid1.replace(/[{}]/g, "").toLowerCase() === guid2.replace(/[{}]/g, "").toLowerCase();
        }

        return isEqual;
    };

    var enableField = function (fieldName) {
        /// <summary>
        /// Enable a field by the name
        /// </summary>
        /// <param name="fieldName" type="string">
        /// The name of the field to be enabled
        /// </param>
        /// <returns type="void" />
        Xrm.Page.getControl(fieldName).setDisabled(false);
    };

    var disableField = function (fieldName) {
        /// <summary>
        /// Disable a field by the name
        /// </summary>
        /// <param name="fieldName" type="string">
        /// The name of the field to be disabled
        /// </param>
        /// <returns type="void" />
        Xrm.Page.getControl(fieldName).setDisabled(true);
    };

    var showField = function (fieldName) {
        /// <summary>
        /// Show a field by the name
        /// </summary>
        /// <param name="fieldName" type="string">
        /// The name of the field to be shown
        /// </param>
        /// <returns type="void" />
        Xrm.Page.getControl(fieldName).setVisible(true);
    };

    var hideField = function (fieldName) {
        /// <summary>
        /// Hide a field by the name
        /// </summary>
        /// <param name="fieldName" type="string">
        /// The name of the field to be hidden
        /// </param>
        /// <returns type="void" />
        Xrm.Page.getControl(fieldName).setVisible(false);
    };

    var updateRequirementLevel = function (fieldName, levelName) {
        /// <summary>
        /// Updates the requirement level of a field
        /// </summary>
        /// <param name="fieldName" type="string">
        /// Name of the field
        /// </param>
        /// <param name="levelName" type="string">
        /// Name of the requirement level. [none, recommended, required] (Case Sensitive)
        /// </param>
        /// <returns type="void" />
        Xrm.Page.getAttribute(fieldName).setRequiredLevel(levelName);
    };

    var showError = function (error) {
        /// <summary>
        /// Alert the error message if occurred
        /// </summary>
        /// <param name="error" type="error">
        /// Object of the JavaScript error
        /// </param>
        /// <returns type="void" />
        alertMessage(error.message);
    };

    var getObjectTypeCode = function (entityName) {
        /// <summary>
        /// Gets the EntityTypeCode / ObjectTypeCode of a entity
        /// </summary>
        /// <param name="entityName" type="string">
        /// Name of entity to return object type code of
        /// </param>
        /// <returns type="int" />
        try {
            return null;
        } catch (e) {
            showError(e.message);
            return null;
        }
    };

    var addNotification = function (message, level, uniqueId) {
        /// <summary>
        /// Add a notification bar message with CRM 2011 style
        /// </summary>
        /// <param name="message" type="string">
        /// Details of the message
        /// </param>
        /// <param name="level" type="int">
        /// The warning level of the message: [1 critical, 2 information, 3 warning]
        /// </param>
        /// <param name="uniqueId" type="string">
        /// A unique identifier for the message used with clearFormNotification to remove the notification.
        /// </param>
        /// <returns type="void" />
        if (Xrm.Page.ui.setFormNotification !== undefined) {
            // CRM 2013
            if (!!uniqueId) {
                Xrm.Page.ui.clearFormNotification(uniqueId);
                if (level === 1) {
                    //Error
                    Xrm.Page.ui.setFormNotification(message, "ERROR", uniqueId);
                }
                if (level === 2) {
                    //Info
                    Xrm.Page.ui.setFormNotification(message, "INFO", uniqueId);
                }
                if (level === 3) {
                    //Warning
                    Xrm.Page.ui.setFormNotification(message, "WARNING", uniqueId);
                }
            } else {
                var tempUniqueId = "formNotification00";
                Xrm.Page.ui.clearFormNotification(tempUniqueId);
                if (level === 1) {
                    //Error
                    Xrm.Page.ui.setFormNotification(message, "ERROR", tempUniqueId);
                }
                if (level === 2) {
                    //Info
                    Xrm.Page.ui.setFormNotification(message, "INFO", tempUniqueId);
                }
                if (level === 3) {
                    //Warning
                    Xrm.Page.ui.setFormNotification(message, "WARNING", tempUniqueId);
                }
            }
        }
        else {
            var notificationsArea = document.getElementById('crmNotifications');
            if (notificationsArea === null || notificationsArea === undefined) {
                alertMessage('Cannot find the notification area');
                return;
            }
            if (typeof notificationsArea.AddNotification !== "undefined" && typeof notificationsArea.control.AddNotification !== "undefined") {
                alertMessage('Add Notification is no longer supported');
                return;
            }
            if (level === 1) {
                //critical
                if (typeof notificationsArea.AddNotification !== "undefined") {
                    notificationsArea.AddNotification('mep1', 1, 'source', message);
                } else if (typeof notificationsArea.control.AddNotification !== "undefined") {
                    notificationsArea.control.AddNotification('mep1', 1, 'source', message);
                }
            }

            if (level === 2) {
                //Info
                if (typeof notificationsArea.AddNotification !== "undefined") {
                    notificationsArea.AddNotification('mep3', 3, 'source', message);
                } else if (typeof notificationsArea.control.AddNotification !== "undefined") {
                    notificationsArea.control.AddNotification('mep3', 3, 'source', message);
                }
            }
            if (level === 3) {
                //Warning
                if (typeof notificationsArea.AddNotification !== "undefined") {
                    notificationsArea.AddNotification('mep2', 2, 'source', message);
                } else if (typeof notificationsArea.control.AddNotification !== "undefined") {
                    notificationsArea.control.AddNotification('mep2', 2, 'source', message);
                }
            }
            if (message === "") {
                if (typeof notificationsArea.SetNotifications !== "undefined") {
                    notificationsArea.SetNotifications(null, null);
                } else if (typeof notificationsArea.control.SetNotifications !== "undefined") {
                    notificationsArea.control.SetNotifications(null, null);
                } else {
                    alertMessage('Set Notification is no longer supported');
                }
            }
        }
    };

    var addControlNotification = function (attributeName, message) {
        if (Xrm.Page.getControl(attributeName).setNotification !== undefined) {
            Xrm.Page.getControl(attributeName).setNotification(message);
        }
    };

    var calculateDaysBetween = function (datetime1, datetime2) {
        /// <summary>
        /// Calculate the days between two dates
        /// </summary>
        /// <param name="datetime1" type="DateTime">
        /// The first / early date to be calculated
        /// </param>
        /// <param name="datetime2" type="DateTime">
        /// The second / later date to e calculated
        /// </param>
        /// <returns type="int" />

        // The number of milliseconds in one day
        var oneDay = 1000 * 60 * 60 * 24;

        // Convert both dates to milliseconds
        var date1Ms = datetime1.getTime();
        var date2Ms = datetime2.getTime();

        // Calculate the difference in milliseconds
        var differenceMs = Math.abs(date1Ms - date2Ms); // Convert back to days and return
        return Math.round(differenceMs / oneDay);
    };

    var disableAllControlsInTab = function (tabControlNo) {
        /// <summary>
        /// Disable all controls in a tab by tab number.
        /// </summary>
        /// <param name="tabControlNo" type="int">
        /// The number of the tab
        /// </param>
        /// <returns type="void" />
        var tabControl = Xrm.Page.ui.tabs.get(tabControlNo);
        if (tabControl != null) {
            Xrm.Page.ui.controls.forEach(
             function (control) {
                 if (control.getParent() !== null && control.getParent().getParent() != null && control.getParent().getParent() === tabControl && control.getControlType() !== "subgrid") {
                     control.setDisabled(true);
                 }
             });
        }
    };

    var disableAllControlsInSection = function (sectionLabel) {
        /// <summary>
        /// Disable all controls in a section by section label.
        /// </summary>
        /// <param name="sectionLabel" type="string">
        /// The label of the section
        /// </param>
        /// <returns type="void" />
        var tabs = Xrm.Page.ui.tabs;
        for (var i = 0, tablength = tabs.getLength() ; i < tablength; i++) {
            var tab = tabs.get(i);
            var sections = tab.sections;
            for (var j = 0, sectionlength = sections.getLength() ; j < sectionlength; j++) {
                var section = sections.get(j);
                if (section.getLabel().toLowerCase() === sectionLabel.toLowerCase()) {
                    Xrm.Page.ui.controls.forEach(
                        function (control) {
                            if (control.getParent() !== null && control.getParent().getLabel() === sectionLabel && control.getControlType() !== "subgrid") {
                                control.setDisabled(true);
                            }
                        });
                    break;
                }
            }
        }
    };

    // Toolkit's public static members
    return {
        EnableField: enableField,
        DisableField: disableField,
        ShowField: showField,
        HideField: hideField,
        UpdateRequiredLevel: updateRequirementLevel,
        GetObjectTypeCode: getObjectTypeCode,
        CalculateDaysBetween: calculateDaysBetween,
        AddNotification: addNotification,
        AddControlNotification: addControlNotification,
        ShowError: showError,
        GuidsAreEqual: guidsAreEqual,
        DisableAllControlsInTab: disableAllControlsInTab,
        DisableAllControlsInSection: disableAllControlsInSection
    };
}();

XrmServiceToolkit.Rest = function () {
    // Private members

    var alertMessage = function (message) {
        (Xrm.Utility !== undefined && Xrm.Utility.alertDialog !== undefined) ? Xrm.Utility.alertDialog(message) : alert(message);
    };

    var htmlEncode = function (s) {
        if (s === null || s === "" || s === undefined) return s;
        for (var count = 0, buffer = "", hEncode = "", cnt = 0, slength = s.length; cnt < slength; cnt++) {
            var c = s.charCodeAt(cnt);
            if (c > 96 && c < 123 || c > 64 && c < 91 || c === 32 || c > 47 && c < 58 || c === 46 || c === 44 || c === 45 || c === 95)
                buffer += String.fromCharCode(c);
            else buffer += "&#" + c + ";";
            if (++count === 500) {
                hEncode += buffer; buffer = ""; count = 0;
            }
        }
        if (buffer.length) hEncode += buffer;
        return hEncode;
    };

    var innerSurrogateAmpersandWorkaround = function (s) {
        var buffer = '';
        var c0;
        for (var cnt = 0, slength = s.length; cnt < slength; cnt++) {
            c0 = s.charCodeAt(cnt);
            if (c0 >= 55296 && c0 <= 57343)
                if (cnt + 1 < s.length) {
                    var c1 = s.charCodeAt(cnt + 1);
                    if (c1 >= 56320 && c1 <= 57343) {
                        buffer += "CRMEntityReferenceOpen" + ((c0 - 55296) * 1024 + (c1 & 1023) + 65536).toString(16) + "CRMEntityReferenceClose"; cnt++;
                    }
                    else
                        buffer += String.fromCharCode(c0);
                }
                else buffer += String.fromCharCode(c0);
            else buffer += String.fromCharCode(c0);
        }
        s = buffer;
        buffer = "";
        for (cnt = 0, slength = s.length; cnt < slength; cnt++) {
            c0 = s.charCodeAt(cnt);
            if (c0 >= 55296 && c0 <= 57343)
                buffer += String.fromCharCode(65533);
            else buffer += String.fromCharCode(c0);
        }
        s = buffer;
        s = htmlEncode(s);
        s = s.replace(/CRMEntityReferenceOpen/g, "&#x");
        s = s.replace(/CRMEntityReferenceClose/g, ";");
        return s;
    };

    // ReSharper disable UnusedLocals
    var crmXmlEncode = function (s) {
        // ReSharper restore UnusedLocals
        // ReSharper disable UsageOfPossiblyUnassignedValue
        // ReSharper disable ExpressionIsAlwaysConst
        if ('undefined' === typeof s || 'unknown' === typeof s || null === s) return s;
            // ReSharper restore ExpressionIsAlwaysConst
            // ReSharper restore UsageOfPossiblyUnassignedValue
        else if (typeof s != "string") s = s.toString();
        return innerSurrogateAmpersandWorkaround(s);
    };

    // ReSharper disable UnusedLocals
    var crmXmlDecode = function (s) {
        // ReSharper restore UnusedLocals
        if (typeof s != "string") s = s.toString();
        return s;
    };

    var context = function () {
        ///<summary>
        /// Private function to the context object.
        ///</summary>
        ///<returns>Context</returns>
        var oContext;
            if (typeof Xrm != "undefined") {
                oContext = Xrm.Page.context;
            }        
        else {
            if (typeof GetGlobalContext != "undefined") {
                oContext = GetGlobalContext();
            }else {
                throw new Error("Context is not available.");
            }
        }
        return oContext;
    };

    var getClientUrl = function () {
        ///<summary>
        /// Private function to return the server URL from the context
        ///</summary>
        ///<returns>String</returns>
        var serverUrl = typeof context().getClientUrl !== "undefined" ? context().getClientUrl() : context().getServerUrl();
        if (serverUrl.match(/\/$/)) {
            serverUrl = serverUrl.substring(0, serverUrl.length - 1);
        }
        return serverUrl;
    };

    var oDataPath = function () {
        ///<summary>
        /// Private function to return the path to the REST endpoint.
        ///</summary>
        ///<returns>String</returns>
        return getClientUrl() + "/XRMServices/2011/OrganizationData.svc/";
    };

    var errorHandler = function (req) {
        ///<summary>
        /// Private function return an Error object to the errorCallback
        ///</summary>
        ///<param name="req" type="XMLHttpRequest">
        /// The XMLHttpRequest response that returned an error.
        ///</param>
        ///<returns>Error</returns>
        throw new Error("Error : " +
        req.status + ": " +
        req.statusText + ": " +
        JSON.parse(req.responseText).error.message.value);
    };

    var dateReviver = function (key, value) {
        ///<summary>
        /// Private function to convert matching string values to Date objects.
        ///</summary>
        ///<param name="key" type="String">
        /// The key used to identify the object property
        ///</param>
        ///<param name="value" type="String">
        /// The string value representing a date
        ///</param>
        var a;
        if (typeof value === 'string') {
            a = /Date\(([-+]?\d+)\)/.exec(value);
            if (a) {
                return new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));
            }
        }
        return value;
    };

    var parameterCheck = function (parameter, message) {
        ///<summary>
        /// Private function used to check whether required parameters are null or undefined
        ///</summary>
        ///<param name="parameter" type="Object">
        /// The parameter to check;
        ///</param>
        ///<param name="message" type="String">
        /// The error message text to include when the error is thrown.
        ///</param>
        if ((typeof parameter === "undefined") || parameter === null) {
            throw new Error(message);
        }
    };

    var stringParameterCheck = function (parameter, message) {
        ///<summary>
        /// Private function used to check whether required parameters are null or undefined
        ///</summary>
        ///<param name="parameter" type="String">
        /// The string parameter to check;
        ///</param>
        ///<param name="message" type="String">
        /// The error message text to include when the error is thrown.
        ///</param>
        if (typeof parameter != "string") {
            throw new Error(message);
        }
    };

    var callbackParameterCheck = function (callbackParameter, message) {
        ///<summary>
        /// Private function used to check whether required callback parameters are functions
        ///</summary>
        ///<param name="callbackParameter" type="Function">
        /// The callback parameter to check;
        ///</param>
        ///<param name="message" type="String">
        /// The error message text to include when the error is thrown.
        ///</param>
        if (typeof callbackParameter != "function") {
            throw new Error(message);
        }
    };

    var booleanParameterCheck = function (parameter, message) {
        ///<summary>
        /// Private function used to check whether required parameters are null or undefined
        ///</summary>
        ///<param name="parameter" type="String">
        /// The string parameter to check;
        ///</param>
        ///<param name="message" type="String">
        /// The error message text to include when the error is thrown.
        ///</param>
        if (typeof parameter != "boolean") {
            throw new Error(message);
        }
    };

    var getXhr = function () {
        ///<summary>
        /// Get an instance of XMLHttpRequest for all browsers
        ///</summary>
        if (XMLHttpRequest) {
            // Chrome, Firefox, IE7+, Opera, Safari
            // ReSharper disable InconsistentNaming
            return new XMLHttpRequest();
            // ReSharper restore InconsistentNaming
        }
        // IE6
        try {
            // The latest stable version. It has the best security, performance,
            // reliability, and W3C conformance. Ships with Vista, and available
            // with other OS's via downloads and updates.
            return new ActiveXObject('MSXML2.XMLHTTP.6.0');
        } catch (e) {
            try {
                // The fallback.
                return new ActiveXObject('MSXML2.XMLHTTP.3.0');
            } catch (e) {
                alertMessage('This browser is not AJAX enabled.');
                return null;
            }
        }
    };

    var createRecord = function (object, type, successCallback, errorCallback, async) {
        ///<summary>
        /// Sends synchronous/asynchronous request to create a new record.
        ///</summary>
        ///<param name="object" type="Object">
        /// A JavaScript object with properties corresponding to the Schema name of
        /// entity attributes that are valid for create operations.
        ///</param>
        parameterCheck(object, "XrmServiceToolkit.REST.createRecord requires the object parameter.");
        ///<param name="type" type="string">
        /// A String representing the name of the entity
        ///</param>
        stringParameterCheck(type, "XrmServiceToolkit.REST.createRecord requires the type parameter is a string.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called by a successful response.
        /// This function can accept the returned record as a parameter.
        /// </param>
        callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.createRecord requires the successCallback is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response.
        /// This function must accept an Error object as a parameter.
        /// </param>
        callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.createRecord requires the errorCallback is a function.");
        ///<param name="async" type="Boolean">
        /// A Boolean representing if the method should run asynchronously or synchronously
        /// true means asynchronously. false means synchronously
        /// </param>
        booleanParameterCheck(async, "XrmServiceToolkit.REST.createRecord requires the async is a boolean.");

        var req = getXhr();
        req.open("POST", oDataPath() + type, async);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");

        if (async) {
            req.onreadystatechange = function () {
                if (this.readyState === 4 /* complete */) {
                    req.onreadystatechange = null;
                    if (req.status === 201) {
                        successCallback(JSON.parse(req.responseText, dateReviver).d);
                    }
                    else {
                        errorCallback(errorHandler(req));
                    }
                }
            };
            req.send(JSON.stringify(object));
        } else {
            req.send(JSON.stringify(object));
            if (req.status === 201) {
                successCallback(JSON.parse(req.responseText, dateReviver).d);
            }
            else {
                errorCallback(errorHandler(req));
            }
        }

    };

    var retrieveRecord = function (id, type, select, expand, successCallback, errorCallback, async) {
        ///<summary>
        /// Sends synchronous/asynchronous request to retrieve a record.
        ///</summary>
        ///<param name="id" type="String">
        /// A String representing the GUID value for the record to retrieve.
        ///</param>
        stringParameterCheck(id, "XrmServiceToolkit.REST.retrieveRecord requires the id parameter is a string.");
        ///<param name="type" type="string">
        /// A String representing the name of the entity
        ///</param>
        stringParameterCheck(type, "XrmServiceToolkit.REST.retrieveRecord requires the type parameter is a string.");
        ///<param name="select" type="String">
        /// A String representing the $select OData System Query Option to control which
        /// attributes will be returned. This is a comma separated list of Attribute names that are valid for retrieve.
        /// If null all properties for the record will be returned
        ///</param>
        if (select != null)
            stringParameterCheck(select, "XrmServiceToolkit.REST.retrieveRecord requires the select parameter is a string.");
        ///<param name="expand" type="String">
        /// A String representing the $expand OData System Query Option value to control which
        /// related records are also returned. This is a comma separated list of of up to 6 entity relationship names
        /// If null no expanded related records will be returned.
        ///</param>
        if (expand != null)
            stringParameterCheck(expand, "XrmServiceToolkit.REST.retrieveRecord requires the expand parameter is a string.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called by a successful response.
        /// This function must accept the returned record as a parameter.
        /// </param>
        callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.retrieveRecord requires the successCallback parameter is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response.
        /// This function must accept an Error object as a parameter.
        /// </param>
        callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.retrieveRecord requires the errorCallback parameter is a function.");
        ///<param name="async" type="Boolean">
        /// A Boolean representing if the method should run asynchronously or synchronously
        /// true means asynchronously. false means synchronously
        /// </param>
        booleanParameterCheck(async, "XrmServiceToolkit.REST.retrieveRecord requires the async parameter is a boolean.");

        var systemQueryOptions = "";

        if (select != null || expand != null) {
            systemQueryOptions = "?";
            if (select != null) {
                var selectString = "$select=" + select;
                if (expand != null) {
                    selectString = selectString + "," + expand;
                }
                systemQueryOptions = systemQueryOptions + selectString;
            }
            if (expand != null) {
                systemQueryOptions = systemQueryOptions + "&$expand=" + expand;
            }
        }

        var req = getXhr();
        req.open("GET", oDataPath() + type + "(guid'" + id + "')" + systemQueryOptions, async);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");

        if (async) {
            req.onreadystatechange = function () {
                if (req.readyState === 4 /* complete */) {
                    if (req.status === 200) {
                        successCallback(JSON.parse(req.responseText, dateReviver).d);
                    }
                    else {
                        errorCallback(errorHandler(req));
                    }
                }
            };
            req.send();
        } else {
            req.send();
            if (req.status === 200) {
                successCallback(JSON.parse(req.responseText, dateReviver).d);
            }
            else {
                errorCallback(errorHandler(req));
            }
        }

    };

    var updateRecord = function (id, object, type, successCallback, errorCallback, async) {
        ///<summary>
        /// Sends synchronous/asynchronous request to update a record.
        ///</summary>
        ///<param name="id" type="String">
        /// A String representing the GUID value for the record to update.
        ///</param>
        stringParameterCheck(id, "XrmServiceToolkit.REST.updateRecord requires the id parameter.");
        ///<param name="object" type="Object">
        /// A JavaScript object with properties corresponding to the Schema name of
        /// entity attributes that are valid for create operations.
        ///</param>
        parameterCheck(object, "XrmServiceToolkit.REST.updateRecord requires the object parameter.");
        ///<param name="type" type="string">
        /// A String representing the name of the entity
        ///</param>
        stringParameterCheck(type, "XrmServiceToolkit.REST.updateRecord requires the type parameter.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called by a successful response.
        /// Nothing will be returned to this function.
        /// </param>
        callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.updateRecord requires the successCallback is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response.
        /// This function must accept an Error object as a parameter.
        /// </param>
        callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.updateRecord requires the errorCallback is a function.");
        ///<param name="async" type="Boolean">
        /// A Boolean representing if the method should run asynchronously or synchronously
        /// true means asynchronously. false means synchronously
        /// </param>
        booleanParameterCheck(async, "XrmServiceToolkit.REST.updateRecord requires the async parameter is a boolean.");

        var req = getXhr();

        req.open("POST", oDataPath() + type + "(guid'" + id + "')", async);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("X-HTTP-Method", "MERGE");

        if (async) {
            req.onreadystatechange = function () {
                if (req.readyState === 4 /* complete */) {
                    if (req.status === 204 || req.status === 1223) {
                        successCallback();
                    }
                    else {
                        errorCallback(errorHandler(req));
                    }
                }
            };
            req.send(JSON.stringify(object));
        } else {
            req.send(JSON.stringify(object));
            if (req.status === 204 || req.status === 1223) {
                successCallback();
            }
            else {
                errorCallback(errorHandler(req));
            }
        }

    };

    var deleteRecord = function (id, type, successCallback, errorCallback, async) {
        ///<summary>
        /// Sends synchronous/asynchronous request to delete a record.
        ///</summary>
        ///<param name="id" type="String">
        /// A String representing the GUID value for the record to delete.
        ///</param>
        stringParameterCheck(id, "XrmServiceToolkit.REST.deleteRecord requires the id parameter.");
        ///<param name="type" type="string">
        /// A String representing the name of the entity
        ///</param>
        stringParameterCheck(type, "XrmServiceToolkit.REST.deleteRecord requires the type parameter.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called by a successful response.
        /// Nothing will be returned to this function.
        /// </param>
        callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.deleteRecord requires the successCallback is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response.
        /// This function must accept an Error object as a parameter.
        /// </param>
        callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.deleteRecord requires the errorCallback is a function.");
        ///<param name="async" type="Boolean">
        /// A Boolean representing if the method should run asynchronously or synchronously
        /// true means asynchronously. false means synchronously
        /// </param>
        booleanParameterCheck(async, "XrmServiceToolkit.REST.deleteRecord requires the async parameter is a boolean.");

        var req = getXhr();
        req.open("POST", oDataPath() + type + "(guid'" + id + "')", async);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("X-HTTP-Method", "DELETE");

        if (async) {
            req.onreadystatechange = function () {
                if (req.readyState === 4 /* complete */) {
                    if (req.status === 204 || req.status === 1223) {
                        successCallback();
                    }
                    else {
                        errorCallback(errorHandler(req));
                    }
                }
            };
            req.send();
        } else {
            req.send();
            if (req.status === 204 || req.status === 1223) {
                successCallback();
            }
            else {
                errorCallback(errorHandler(req));
            }
        }
    };

    var retrieveMultipleRecords = function (type, options, successCallback, errorCallback, onComplete, async) {
        ///<summary>
        /// Sends synchronous/asynchronous request to retrieve records.
        ///</summary>
        ///<param name="type" type="String">
        /// The Schema Name of the Entity type record to retrieve.
        /// For an Account record, use "Account"
        ///</param>
        stringParameterCheck(type, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the type parameter is a string.");
        ///<param name="options" type="String">
        /// A String representing the OData System Query Options to control the data returned
        ///</param>
        if (options != null)
            stringParameterCheck(options, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the options parameter is a string.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called for each page of records returned.
        /// Each page is 50 records. If you expect that more than one page of records will be returned,
        /// this function should loop through the results and push the records into an array outside of the function.
        /// Use the OnComplete event handler to know when all the records have been processed.
        /// </param>
        callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the successCallback parameter is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response.
        /// This function must accept an Error object as a parameter.
        /// </param>
        callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the errorCallback parameter is a function.");
        ///<param name="OnComplete" type="Function">
        /// The function that will be called when all the requested records have been returned.
        /// No parameters are passed to this function.
        /// </param>
        callbackParameterCheck(onComplete, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the OnComplete parameter is a function.");
        ///<param name="async" type="Boolean">
        /// A Boolean representing if the method should run asynchronously or synchronously
        /// true means asynchronously. false means synchronously
        /// </param>
        booleanParameterCheck(async, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the async parameter is a boolean.");

        var optionsString = '';
        if (options != null) {
            if (options.charAt(0) !== "?") {
                optionsString = "?" + options;
            }
            else {
                optionsString = options;
            }
        }

        var req = getXhr();
        req.open("GET", oDataPath() + type + optionsString, async);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");

        if (async) {
            req.onreadystatechange = function () {
                if (req.readyState === 4 /* complete */) {
                    if (req.status === 200) {
                        var returned = JSON.parse(req.responseText, dateReviver).d;
                        successCallback(returned.results);
                        if (returned.__next == null) {
                            onComplete();
                        } else {
                            var queryOptions = returned.__next.substring((oDataPath() + type).length);
                            retrieveMultipleRecords(type, queryOptions, successCallback, errorCallback, onComplete, async);
                        }
                    }
                    else {
                        errorCallback(errorHandler(req));
                    }
                }
            };
            req.send();
        } else {
            req.send();
            if (req.status === 200) {
                var returned = JSON.parse(req.responseText, dateReviver).d;
                successCallback(returned.results);
                if (returned.__next == null) {
                    onComplete();
                } else {
                    var queryOptions = returned.__next.substring((oDataPath() + type).length);
                    retrieveMultipleRecords(type, queryOptions, successCallback, errorCallback, onComplete, async);
                }
            }
            else {
                errorCallback(errorHandler(req));
            }
        }
    };

    var performRequest = function (settings) {
        parameterCheck(settings, "The value passed to the performRequest function settings parameter is null or undefined.");
        var request = getXhr();
        request.open(settings.type, settings.url, settings.async);
        request.setRequestHeader("Accept", "application/json");
        if (settings.action != null) {
            request.setRequestHeader("X-HTTP-Method", settings.action);
        }
        request.setRequestHeader("Content-Type", "application/json; charset=utf-8");

        if (settings.async) {
            request.onreadystatechange = function () {
                if (request.readyState === 4 /*Complete*/) {
                    // Status 201 is for create, status 204/1223 for link and delete.
                    // There appears to be an issue where IE maps the 204 status to 1223
                    // when no content is returned.
                    if (request.status === 204 || request.status === 1223 || request.status === 201) {
                        settings.success(request);
                    }
                    else {
                        // Failure
                        if (settings.error) {
                            settings.error(errorHandler(request));
                        }
                        else {
                            errorHandler(request);
                        }
                    }
                }
            };

            if (typeof settings.data === "undefined") {
                request.send();
            }
            else {
                request.send(settings.data);
            }
        } else {
            if (typeof settings.data === "undefined") {
                request.send();
            }
            else {
                request.send(settings.data);
            }
            if (request.status === 204 || request.status === 1223 || request.status === 201) {
                settings.success(request);
            }
            else {
                // Failure
                if (settings.error) {
                    settings.error(errorHandler(request));
                }
                else {
                    errorHandler(request);
                }
            }
        }

    };

    var associateRecord = function (entityid1, odataSetName1, entityid2, odataSetName2, relationship, successCallback, errorCallback, async) {
        ///<summary>
        /// Sends synchronous/asynchronous request to associate a record.
        ///</summary>
        ///<param name="entityid1" type="string">
        /// A String representing the GUID value for the record to associate.
        ///</param>
        parameterCheck(entityid1, "XrmServiceToolkit.REST.associateRecord requires the entityid1 parameter.");
        ///<param name="odataSetName1" type="string">
        /// A String representing the odataset name for entityid1
        ///</param>
        parameterCheck(odataSetName1, "XrmServiceToolkit.REST.associateRecord requires the odataSetName1 parameter.");
        ///<param name="entityid2" type="string">
        /// A String representing the GUID value for the record to be associated.
        ///</param>
        parameterCheck(entityid2, "XrmServiceToolkit.REST.associateRecord requires the entityid2 parameter.");
        ///<param name="odataSetName2" type="string">
        /// A String representing the odataset name for entityid2
        ///</param>
        parameterCheck(odataSetName2, "XrmServiceToolkit.REST.associateRecord requires the odataSetName2 parameter.");
        ///<param name="relationship" type="string">
        /// A String representing the name of the relationship for association
        ///</param>
        parameterCheck(relationship, "XrmServiceToolkit.REST.associateRecord requires the relationship parameter.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called by a successful response.
        /// Nothing will be returned to this function.
        /// </param>
        callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.associateRecord requires the successCallback is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response.
        /// This function must accept an Error object as a parameter.
        /// </param>
        callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.associateRecord requires the errorCallback is a function.");
        ///<param name="async" type="Boolean">
        /// A Boolean representing if the method should run asynchronously or synchronously
        /// true means asynchronously. false means synchronously
        /// </param>
        booleanParameterCheck(async, "XrmServiceToolkit.REST.associateRecord requires the async parameter is a boolean");

        var entity2 = {};
        entity2.uri = oDataPath() + "/" + odataSetName2 + "(guid'" + entityid2 + "')";
        var jsonEntity = window.JSON.stringify(entity2);

        performRequest({
            type: "POST",
            url: oDataPath() + "/" + odataSetName1 + "(guid'" + entityid1 + "')/$links/" + relationship,
            data: jsonEntity,
            success: successCallback,
            error: errorCallback,
            async: async
        });
    };

    var disassociateRecord = function (entityid1, odataSetName, entityid2, relationship, successCallback, errorCallback, async) {
        ///<summary>
        /// Sends synchronous/asynchronous request to disassociate a record.
        ///</summary>
        ///<param name="entityid1" type="string">
        /// A String representing the GUID value for the record to disassociate.
        ///</param>
        parameterCheck(entityid1, "XrmServiceToolkit.REST.disassociateRecord requires the entityid1 parameter.");
        ///<param name="odataSetName" type="string">
        /// A String representing the odataset name for entityid1
        ///</param>
        parameterCheck(odataSetName, "XrmServiceToolkit.REST.disassociateRecord requires the odataSetName parameter.");
        ///<param name="entityid2" type="string">
        /// A String representing the GUID value for the record to be disassociated.
        ///</param>
        parameterCheck(entityid2, "XrmServiceToolkit.REST.disassociateRecord requires the entityid2 parameter.");
        ///<param name="relationship" type="string">
        /// A String representing the name of the relationship for disassociation
        ///</param>
        parameterCheck(relationship, "XrmServiceToolkit.REST.disassociateRecord requires the relationship parameter.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called by a successful response.
        /// Nothing will be returned to this function.
        /// </param>
        callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.disassociateRecord requires the successCallback is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response.
        /// This function must accept an Error object as a parameter.
        /// </param>
        callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.disassociateRecord requires the errorCallback is a function.");
        ///<param name="async" type="Boolean">
        /// A Boolean representing if the method should run asynchronously or synchronously
        /// true means asynchronously. false means synchronously
        /// </param>
        booleanParameterCheck(async, "XrmServiceToolkit.REST.disassociateRecord requires the async parameter is a boolean.");

        var url = oDataPath() + "/" + odataSetName + "(guid'" + entityid1 + "')/$links/" + relationship + "(guid'" + entityid2 + "')";
        performRequest({
            url: url,
            type: "POST",
            action: "DELETE",
            error: errorCallback,
            success: successCallback,
            async: async
        });
    };

    // Toolkit's public static members
    return {
        Create: createRecord,
        Retrieve: retrieveRecord,
        Update: updateRecord,
        Delete: deleteRecord,
        RetrieveMultiple: retrieveMultipleRecords,
        Associate: associateRecord,
        Disassociate: disassociateRecord
    };
}();

XrmServiceToolkit.Soap = function () {

    var alertMessage = function (message) {
        (Xrm.Utility !== undefined && Xrm.Utility.alertDialog !== undefined) ? Xrm.Utility.alertDialog(message) : alert(message);
    };

    var htmlEncode = function (s) {
        if (s === null || s === "" || s === undefined) return s;
        for (var count = 0, buffer = "", hEncode = "", cnt = 0, sLength = s.length; cnt < sLength; cnt++) {
            var c = s.charCodeAt(cnt);
            if (c > 96 && c < 123 || c > 64 && c < 91 || c === 32 || c > 47 && c < 58 || c === 46 || c === 44 || c === 45 || c === 95)
                buffer += String.fromCharCode(c);
            else buffer += "&#" + c + ";";
            if (++count === 500) {
                hEncode += buffer; buffer = ""; count = 0;
            }
        }
        if (buffer.length) hEncode += buffer;
        return hEncode;
    };

    var innerSurrogateAmpersandWorkaround = function (s) {
        var buffer = '';
        var c0;
        var cnt;
        var cntlength;
        for (cnt = 0, cntlength = s.length; cnt < cntlength; cnt++) {
            c0 = s.charCodeAt(cnt);
            if (c0 >= 55296 && c0 <= 57343)
                if (cnt + 1 < s.length) {
                    var c1 = s.charCodeAt(cnt + 1);
                    if (c1 >= 56320 && c1 <= 57343) {
                        buffer += "CRMEntityReferenceOpen" + ((c0 - 55296) * 1024 + (c1 & 1023) + 65536).toString(16) + "CRMEntityReferenceClose"; cnt++;
                    }
                    else
                        buffer += String.fromCharCode(c0);
                }
                else buffer += String.fromCharCode(c0);
            else buffer += String.fromCharCode(c0);
        }
        s = buffer;
        buffer = "";
        for (cnt = 0, cntlength = s.length; cnt < cntlength; cnt++) {
            c0 = s.charCodeAt(cnt);
            if (c0 >= 55296 && c0 <= 57343)
                buffer += String.fromCharCode(65533);
            else buffer += String.fromCharCode(c0);
        }
        s = buffer;
        s = htmlEncode(s);
        s = s.replace(/CRMEntityReferenceOpen/g, "&#x");
        s = s.replace(/CRMEntityReferenceClose/g, ";");
        return s;
    };

    var crmXmlEncode = function (s) {
        // ReSharper disable UsageOfPossiblyUnassignedValue
        // ReSharper disable ExpressionIsAlwaysConst
        if ('undefined' === typeof s || 'unknown' === typeof s || null === s) return s;
            // ReSharper restore ExpressionIsAlwaysConst
            // ReSharper restore UsageOfPossiblyUnassignedValue
        else if (typeof s != "string") s = s.toString();
        return innerSurrogateAmpersandWorkaround(s);
    };

    var crmXmlDecode = function (s) {
        if (typeof s != "string") s = s.toString();
        return s;
    };

    var padNumber = function (s, len) {
        len = len || 2;

        s = '' + s;
        while (s.length < len) {
            s = "0" + s;
        }
        return s;
    };

    var encodeDate = function (dateTime) {
        return dateTime.getFullYear() + "-" +
               padNumber(dateTime.getMonth() + 1) + "-" +
               padNumber(dateTime.getDate()) + "T" +
               padNumber(dateTime.getHours()) + ":" +
               padNumber(dateTime.getMinutes()) + ":" +
               padNumber(dateTime.getSeconds());
    };

    var encodeValue = function (value) {
        // Handle GUIDs wrapped in braces
        if (typeof value == typeof "" && value.slice(0, 1) === "{" && value.slice(-1) === "}") {
            value = value.slice(1, -1);
        }

        // ReSharper disable QualifiedExpressionMaybeNull
        return (typeof value === "object" && value.getTime)
        // ReSharper restore QualifiedExpressionMaybeNull
               ? encodeDate(value)
               : crmXmlEncode(value);
    };

    var context = function () {
        ///<summary>
        /// Private function to the context object.
        ///</summary>
        ///<returns>Context</returns>
        var oContext;
        if (typeof Xrm != "undefined") {
            oContext = Xrm.Page.context;
        }
        else {
            if (typeof GetGlobalContext != "undefined") {
                oContext = GetGlobalContext();
            } else {
                throw new Error("Context is not available.");
            }
        }
        return oContext;
    };

    var getClientUrl = function () {
        ///<summary>
        /// Private function to return the server URL from the context
        ///</summary>
        ///<returns>String</returns>
        var serverUrl = typeof context().getClientUrl != 'undefined' ? context().getClientUrl() : context().getServerUrl();
        if (serverUrl.match(/\/$/)) {
            serverUrl = serverUrl.substring(0, serverUrl.length - 1);
        }
        return serverUrl;
    };

    var orgServicePath = function () {
        ///<summary>
        /// Private function to return the path to the organization service.
        ///</summary>
        ///<returns>String</returns>
        return getClientUrl() + "/XRMServices/2011/Organization.svc/web";
    };

    // ReSharper disable UnusedLocals
    var dateReviver = function (key, value) {
        // ReSharper restore UnusedLocals
        ///<summary>
        /// Private function to convert matching string values to Date objects.
        ///</summary>
        ///<param name="key" type="String">
        /// The key used to identify the object property
        ///</param>
        ///<param name="value" type="String">
        /// The string value representing a date
        ///</param>
        var a;
        if (typeof value === 'string') {
            a = /Date\(([-+]?\d+)\)/.exec(value);
            if (a) {
                return new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));
            }
        }
        return value;
    };

    var xrmValue = function (sType, sValue) {
        this.type = sType;
        this.value = sValue;
    };

    var xrmEntityReference = function (gId, sLogicalName, sName) {
        this.id = gId;
        this.logicalName = sLogicalName;
        this.name = sName;
        this.type = 'EntityReference';
    };

    var xrmEntityCollection = function (items) {
        this.value = items;
        this.type = 'EntityCollection';
    };

    var xrmOptionSetValue = function (iValue, sFormattedValue) {
        this.value = iValue;
        this.formattedValue = sFormattedValue;
        this.type = 'OptionSetValue';
    };

    var businessEntity = function (logicalName, id) {
        ///<summary>
        /// A object represents a business entity for CRM 2011.
        ///</summary>
        ///<param name="logicalName" type="String">
        /// A String represents the name of the entity.
        /// For example, "contact" means the business entity will be a contact entity
        /// </param>
        ///<param name="id" type="String">
        /// A String represents the id of the entity. If not passed, it will be auto populated as a empty guid string
        /// </param>
        this.id = (!id) ? "00000000-0000-0000-0000-000000000000" : id;
        this.logicalName = logicalName;
        this.attributes = new Object();
    };

    var stringToDate = function (s) {
        var b = s.split(/\D/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5]));
    };

    var nsResolver = function (prefix) {
        var ns = {
            "s": "http://schemas.xmlsoap.org/soap/envelope/",
            "a": "http://schemas.microsoft.com/xrm/2011/Contracts",
            "i": "http://www.w3.org/2001/XMLSchema-instance",
            "b": "http://schemas.datacontract.org/2004/07/System.Collections.Generic",
            "c": "http://schemas.microsoft.com/xrm/2011/Metadata",
            "ser": "http://schemas.microsoft.com/xrm/2011/Contracts/Services"
        };
        return ns[prefix] || null;
    };

    var isNodeNull = function (node) {
        if (node == null)
        { return true; }
        if ((node.attributes.getNamedItem("i:nil") != null) && (node.attributes.getNamedItem("i:nil").value === "true"))
        { return true; }
        return false;
    };

    var selectNodes = function (node, xPathExpression) {
        if (typeof (node.selectNodes) != "undefined") {
            return node.selectNodes(xPathExpression);
        }
        else {
            var output = [];
            var xPathResults = node.evaluate(xPathExpression, node, nsResolver, XPathResult.ANY_TYPE, null);
            var result = xPathResults.iterateNext();
            while (result) {
                output.push(result);
                result = xPathResults.iterateNext();
            }
            return output;
        }
    };

    var selectSingleNode = function (node, xpathExpr) {
        if (typeof (node.selectSingleNode) != "undefined") {
            return node.selectSingleNode(xpathExpr);
        }
        else {
            var xpe = new XPathEvaluator();
            var results = xpe.evaluate(xpathExpr, node, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            return results.singleNodeValue;

        }
    };

    var selectSingleNodeText = function (node, xpathExpr) {
        var x = selectSingleNode(node, xpathExpr);
        if (isNodeNull(x))
        { return null; }
        if (typeof (x.text) != "undefined") {
            return x.text;
        }
        else {
            return x.textContent;
        }
    };

    var getNodeText = function (node) {
        if (typeof (node.text) != "undefined") {
            return node.text;
        }
        else {
            return node.textContent;
        }
    };

    var setSelectionNamespaces = function (doc) {
        var namespaces = [
            "xmlns:s='http://schemas.xmlsoap.org/soap/envelope/'",
            "xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'",
            "xmlns:i='http://www.w3.org/2001/XMLSchema-instance'",
            "xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'",
            "xmlns:c='http://schemas.microsoft.com/xrm/2011/Metadata'",
            "xmlns:ser='http://schemas.microsoft.com/xrm/2011/Contracts/Services'"
        ];
        doc.setProperty("SelectionNamespaces", namespaces.join(" "));
    };

    var xmlParser = function (txt) {
        ///<summary>
        /// cross browser responseXml to return a XML object
        ///</summary>
        var xmlDoc = null;
        try {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.loadXML(txt);
        } catch (e) {
            if (window.DOMParser) {
                // ReSharper disable InconsistentNaming
                var parser = new DOMParser();
                // ReSharper restore InconsistentNaming
                xmlDoc = parser.parseFromString(txt, "text/xml");
            } else {
                alertMessage("Cannot convert the XML string to a cross-browser XML object.");
            }
        }

        return xmlDoc;
    };

    var xmlToString = function (responseXml) {
        var xmlString = '';
        try {
            if (responseXml != null) {
                if (typeof XMLSerializer !== "undefined" && typeof responseXml.xml === "undefined") {
                    // ReSharper disable InconsistentNaming
                    xmlString = (new XMLSerializer()).serializeToString(responseXml);
                    // ReSharper restore InconsistentNaming
                } else {
                    if (typeof responseXml.xml !== "undefined") {
                        xmlString = responseXml.xml;
                    }
                    else if (typeof responseXml[0].xml !== "undefined") {
                        xmlString = responseXml[0].xml;
                    }

                }
            }
        } catch (e) {
            alertMessage("Cannot convert the XML to a string.");
        }
        return xmlString;
    };

    businessEntity.prototype = {
        /**
        * Serialize a CRM Business Entity object to XML string in order to be passed to CRM Web Services.
        * @return {String} The serialized XML string of CRM entity.
        */
        serialize: function () {
            var xml = ["<b:value i:type='a:Entity'>"];
            xml.push('<a:Attributes xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">');
            var attributes = this.attributes;
            for (var attributeName in attributes) {
                if (attributes.hasOwnProperty(attributeName)) {
                    var attribute = attributes[attributeName];

                    xml.push("<a:KeyValuePairOfstringanyType>");
                    xml.push("<b:key>", attributeName, "</b:key>");

                    if (attribute === null || attribute.value === null) {
                        xml.push("<b:value i:nil='true' />");
                    } else {
                        var sType = (!attribute.type)
                            ? typeof attribute
                            : crmXmlEncode(attribute.type);
                        var value;
                        var encodedValue;
                        var id;
                        var encodedId;
                        var logicalName;
                        var encodedLogicalName;
                        switch (sType) {
                            case "OptionSetValue":
                                value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                                encodedValue = encodeValue(value);
                                xml.push("<b:value i:type='a:OptionSetValue'>");
                                xml.push("<a:Value>", encodedValue, "</a:Value>", "</b:value>");
                                break;

                            case "EntityCollection":
                                xml.push("<b:value i:type='a:EntityCollection'>");
                                xml.push("<a:Entities>");
                                value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                                var collections = isArray(value) ? value : [value];

                                for (var i = 0, collectionLengh = collections.length; i < collectionLengh; i++) {
                                    var item = collections[i];
                                    id = (item.hasOwnProperty("id")) ? item["id"] : item;
                                    encodedId = encodeValue(id);
                                    logicalName = (item.hasOwnProperty("logicalName")) ? item["logicalName"] : item;
                                    encodedLogicalName = encodeValue(logicalName);
                                    xml.push("<a:Entity>");
                                    xml.push("<a:Attributes>");
                                    xml.push("<a:KeyValuePairOfstringanyType>");
                                    xml.push("<b:key>partyid</b:key>");
                                    xml.push("<b:value i:type='a:EntityReference'>");
                                    xml.push("<a:Id>", encodedId, "</a:Id>");
                                    xml.push("<a:LogicalName>", encodedLogicalName, "</a:LogicalName>");
                                    xml.push("<a:Name i:nil='true' />");
                                    xml.push("</b:value>");
                                    xml.push("</a:KeyValuePairOfstringanyType>");
                                    xml.push("</a:Attributes>");
                                    xml.push("<a:EntityState i:nil='true' />");
                                    xml.push("<a:FormattedValues />");
                                    xml.push("<a:Id>00000000-0000-0000-0000-000000000000</a:Id>");
                                    xml.push("<a:LogicalName>activityparty</a:LogicalName>");
                                    xml.push("<a:RelatedEntities />");
                                    xml.push("</a:Entity>");
                                }
                                xml.push("</a:Entities>");
                                xml.push("<a:EntityName i:nil='true' />");
                                xml.push("<a:MinActiveRowVersion i:nil='true' />");
                                xml.push("<a:MoreRecords>false</a:MoreRecords>");
                                xml.push("<a:PagingCookie i:nil='true' />");
                                xml.push("<a:TotalRecordCount>0</a:TotalRecordCount>");
                                xml.push("<a:TotalRecordCountLimitExceeded>false</a:TotalRecordCountLimitExceeded>");
                                xml.push("</b:value>");
                                break;

                            case "EntityReference":
                                id = (attribute.hasOwnProperty("id")) ? attribute["id"] : attribute;
                                encodedId = encodeValue(id);
                                logicalName = (attribute.hasOwnProperty("logicalName")) ? attribute["logicalName"] : attribute;
                                encodedLogicalName = encodeValue(logicalName);
                                xml.push("<b:value i:type='a:EntityReference'>");
                                xml.push("<a:Id>", encodedId, "</a:Id>");
                                xml.push("<a:LogicalName>", encodedLogicalName, "</a:LogicalName>");
                                xml.push("<a:Name i:nil='true' />", "</b:value>");
                                break;

                            case "Money":
                                value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                                encodedValue = encodeValue(value);
                                xml.push("<b:value i:type='a:Money'>");
                                xml.push("<a:Value>", encodedValue, "</a:Value>", "</b:value>");
                                break;

                            case "guid":
                                value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                                encodedValue = encodeValue(value);
                                xml.push("<b:value i:type='c:guid' xmlns:c='http://schemas.microsoft.com/2003/10/Serialization/'>");
                                xml.push(encodedValue, "</b:value>");
                                break;

                            case "number":
                                value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                                encodedValue = encodeValue(value);
                                var oType = (parseInt(encodedValue) === encodedValue) ? "c:int" : "c:decimal";
                                xml.push("<b:value i:type='", oType, "' xmlns:c='http://www.w3.org/2001/XMLSchema'>");
                                xml.push(encodedValue, '</b:value>');
                                break;

                            case "Double":
                                value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                                encodedValue = encodeValue(value);
                                var oType = "c:double";
                                xml.push("<b:value i:type='", oType, "' xmlns:c='http://www.w3.org/2001/XMLSchema'>");
                                xml.push(encodedValue, '</b:value>');
                                break;

                            default:
                                value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                                encodedValue = encodeValue(value);
                                sType = (typeof value === "object" && value.getTime) ? "dateTime" : sType;
                                xml.push("<b:value i:type='c:", sType, "' xmlns:c='http://www.w3.org/2001/XMLSchema'>", encodedValue, "</b:value>");
                                break;
                        }
                    }
                    xml.push("</a:KeyValuePairOfstringanyType>");
                }
            }

            xml.push("</a:Attributes><a:EntityState i:nil='true' />");
            xml.push("<a:FormattedValues xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic' />");
            xml.push("<a:Id>", encodeValue(this.id), "</a:Id>");
            xml.push("<a:LogicalName>", this.logicalName, "</a:LogicalName>");
            xml.push("<a:RelatedEntities xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic' />");
            xml.push("</b:value>");
            return xml.join("");
        },

        /**
        * Deserialize an XML node into a CRM Business Entity object. The XML node comes from CRM Web Service's response.
        * @param {object} resultNode The XML node returned from CRM Web Service's Fetch, Retrieve, RetrieveMultiple messages.
        */
        deserialize: function (resultNode) {
            var obj = new Object();
            var resultNodes = resultNode.childNodes;

            for (var j = 0, lenj = resultNodes.length; j < lenj; j++) {
                var sKey;
                var parentNode = resultNodes[j];
                switch (parentNode.nodeName) {
                    case "a:Attributes":
                        var attr = parentNode;
                        for (var k = 0, lenk = attr.childNodes.length; k < lenk; k++) {
                            var tempParentNode = attr.childNodes[k];
                            // Establish the Key for the Attribute
                            var tempParentNodeChildNodes = tempParentNode.childNodes;
                            sKey = getNodeText(tempParentNodeChildNodes[0]);

                            var tempNode = tempParentNodeChildNodes[1];
                            // Determine the Type of Attribute value we should expect
                            var sType = tempNode.attributes.getNamedItem("i:type") != null ? tempNode.attributes.getNamedItem("i:type").value : "";

                            // check for AliasedValue
                            if (sType.replace('c:', '').replace('a:', '') === "AliasedValue") {
                                // reset the type to the actual attribute type
                                var subNode = tempNode.childNodes[2];
                                sType = subNode.attributes.getNamedItem("i:type").value;

                                //sKey = getNodeText(tempNode.childNodes[1]) + "." + getNodeText(tempNode.childNodes[0]);
                                // reset the node to the AliasedValue value node
                                tempNode = subNode;
                            }

                            var entRef;
                            var entCv;
                            switch (sType) {
                                case "a:OptionSetValue":
                                    var entOsv = new xrmOptionSetValue();
                                    entOsv.type = sType.replace('a:', '');
                                    entOsv.value = parseInt(getNodeText(tempNode));
                                    obj[sKey] = entOsv;
                                    break;

                                case "a:EntityReference":
                                    entRef = new xrmEntityReference();
                                    entRef.type = sType.replace('a:', '');
                                    var oChildNodes = tempNode.childNodes;
                                    entRef.id = getNodeText(oChildNodes[0]);
                                    entRef.logicalName = getNodeText(oChildNodes[1]);
                                    entRef.name = getNodeText(oChildNodes[2]);
                                    obj[sKey] = entRef;
                                    break;

                                case "a:EntityCollection":
                                    entRef = new xrmEntityCollection();
                                    entRef.type = sType.replace('a:', '');

                                    //get all party items....
                                    var items = [];
                                    var partyNodes = tempNode.childNodes;
                                    for (var y = 0, leny = partyNodes[0].childNodes.length; y < leny; y++) {
                                        var itemNodes = tempParentNode.childNodes[1].childNodes[0].childNodes[y].childNodes[0].childNodes;
                                        for (var z = 0, lenz = itemNodes.length; z < lenz; z++) {
                                            var itemNodeChildNodes = itemNodes[z].childNodes;
                                            var nodeText = getNodeText(itemNodeChildNodes[0]);
                                            if (nodeText === "partyid") {
                                                var itemRef = new xrmEntityReference();
                                                itemRef.id = getNodeText(itemNodeChildNodes[1].childNodes[0]);
                                                itemRef.logicalName = getNodeText(itemNodeChildNodes[1].childNodes[1]);
                                                itemRef.name = getNodeText(itemNodeChildNodes[1].childNodes[2]);
                                                items[y] = itemRef;
                                            }
                                        }
                                    }
                                    entRef.value = items;
                                    obj[sKey] = entRef;
                                    break;

                                case "a:Money":
                                    entCv = new xrmValue();
                                    entCv.type = sType.replace('a:', '');
                                    entCv.value = parseFloat(getNodeText(tempNode));
                                    obj[sKey] = entCv;
                                    break;

                                default:
                                    entCv = new xrmValue();
                                    entCv.type = sType.replace('c:', '').replace('a:', '');
                                    if (entCv.type === "int") {
                                        entCv.value = parseInt(getNodeText(tempNode));
                                    }
                                    else if (entCv.type === "decimal" || entCv.type === "double") {
                                        entCv.value = parseFloat(getNodeText(tempNode));
                                    }
                                    else if (entCv.type === "dateTime") {
                                        entCv.value = stringToDate(getNodeText(tempNode));
                                    }
                                    else if (entCv.type === "boolean") {
                                        entCv.value = (getNodeText(tempNode) === 'false') ? false : true;
                                    }
                                    else {
                                        entCv.value = getNodeText(tempNode);
                                    }
                                    obj[sKey] = entCv;
                                    break;
                            }
                        }
                        this.attributes = obj;
                        break;

                    case "a:Id":
                        this.id = getNodeText(parentNode);
                        break;

                    case "a:LogicalName":
                        this.logicalName = getNodeText(parentNode);
                        break;

                    case "a:FormattedValues":
                        var foVal = parentNode;

                        for (var o = 0, leno = foVal.childNodes.length; o < leno; o++) {
                            // Establish the Key, we are going to fill in the formatted value of the already found attribute
                            var foNode = foVal.childNodes[o];
                            sKey = getNodeText(foNode.childNodes[0]);
                            if (this.attributes[sKey]) {
                                this.attributes[sKey].formattedValue = getNodeText(foNode.childNodes[1]);
                                if (isNaN(this.attributes[sKey].value) && this.attributes[sKey].type === "dateTime") {
                                    this.attributes[sKey].value = new Date(this.attributes[sKey].formattedValue);
                                }
                            }
                        }
                        break;
                }
            }
        }
    };

    var getError = function (resp) {
        //Error descriptions come from http://support.microsoft.com/kb/193625

        if (resp.status === 12029)
        { throw new Error("The attempt to connect to the server failed."); }
        if (resp.status === 12007)
        { throw new Error("The server name could not be resolved."); }
        var faultXml = resp.responseXML;

        var errorMessage = "Unknown (unable to parse the fault)";
        if (faultXml !== null && typeof faultXml == "object") {

            var faultstring = null;
            var errorCode = null;

            var bodyNode = faultXml.firstChild.firstChild;

            //Retrieve the fault node
            for (var i = 0; i < bodyNode.childNodes.length; i++) {
                var node = bodyNode.childNodes[i];

                //NOTE: This comparison does not handle the case where the XML namespace changes
                if ("s:Fault" === node.nodeName) {
                    for (var j = 0; j < node.childNodes.length; j++) {
                        var testNode = node.childNodes[j];
                        if ("faultstring" === testNode.nodeName) {
                            faultstring = getNodeText(testNode);
                        }
                        if ("detail" === testNode.nodeName) {
                            for (var k = 0; k < testNode.childNodes.length; k++) {
                                var orgServiceFault = testNode.childNodes[k];
                                if ("OrganizationServiceFault" === orgServiceFault.nodeName) {
                                    for (var l = 0; l < orgServiceFault.childNodes.length; l++) {
                                        var errorCodeNode = orgServiceFault.childNodes[l];
                                        if ("ErrorCode" === errorCodeNode.nodeName) {
                                            errorCode = getNodeText(errorCodeNode);
                                            break;
                                        }
                                    }
                                }
                            }

                        }
                    }
                    break;
                }

            }
        }
        if (errorCode != null && faultstring != null) {
            errorMessage = "Error Code:" + errorCode + " Message: " + faultstring;
        }
        else {
            if (faultstring != null) {
                errorMessage = faultstring;
            }
        }
        throw new Error(errorMessage);
    };

    var doRequest = function (soapBody, requestType, async, internalCallback) {
        async = async || false;

        // Wrap the Soap Body in a soap:Envelope.
        var soapXml =
        ["<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>",
            "<soap:Body>",
                "<", requestType, " xmlns='http://schemas.microsoft.com/xrm/2011/Contracts/Services' xmlns:i='http://www.w3.org/2001/XMLSchema-instance'>", soapBody, "</", requestType, ">",
            "</soap:Body>",
            "</soap:Envelope>"
        ].join("");

        var req = new XMLHttpRequest();
        req.open("POST", orgServicePath(), async);
        req.setRequestHeader("Accept", "application/xml, text/xml, */*");
        req.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
        req.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/" + requestType);

        //IE10
        try { req.responseType = 'msxml-document'; } catch (e) { }

        if (async) {
            req.onreadystatechange = function () {
                if (req.readyState === 4 /* complete */) {
                    req.onreadystatechange = null; //Addresses potential memory leak issue with IE
                    if (req.status === 200) { // "OK"          
                        var doc = req.responseXML;
                        try { setSelectionNamespaces(doc); } catch (e) { }
                        internalCallback(doc);
                    }
                    else {
                        try {
                            getError(req);
                        }
                        catch (ex) {
                            var e = '<a:Results xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts" xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">' + ex + '</a:Results>';
                            var doc = $.parseXML(e);
                            internalCallback(doc);
                        }
                    }
                }
            };

            req.send(soapXml);
        }
        else {
            req.send(soapXml);
            if (req.status === 200) {
                var doc = req.responseXML;
                try { setSelectionNamespaces(doc); } catch (e) { }
                var result = doc;
                return !!internalCallback ? internalCallback(result) : result;
            } else {
                getError(req);
            }
        }
        // ReSharper disable NotAllPathsReturnValue
    };
    // ReSharper restore NotAllPathsReturnValue

    var sCreate = function (be, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to create a new record.
        ///</summary>
        ///<param name="be" type="Object">
        /// A JavaScript object with properties corresponding to the Schema name of
        /// entity attributes that are valid for create operations.
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>
        var request = be.serialize();

        var async = !!callback;

        var mBody =
           ["<request i:type='a:CreateRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
            "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
            "<a:KeyValuePairOfstringanyType>",
                "<b:key>Target</b:key>",
                request,
            "</a:KeyValuePairOfstringanyType>",
            "</a:Parameters>",
            "<a:RequestId i:nil='true' />",
            "<a:RequestName>Create</a:RequestName>",
            "</request>"].join("");

        return doRequest(mBody, "Execute", async, function (resultXml) {
            var responseText = selectSingleNodeText(resultXml, "//b:value");

            var result = crmXmlDecode(responseText);

            if (!async)
                return result;
            else
                callback(result);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var sUpdate = function (be, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to update an existing record.
        ///</summary>
        ///<param name="businessEntity" type="Object">
        /// A JavaScript object with properties corresponding to the Schema name of
        /// entity attributes that are valid for update operations.
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>
        var request = be.serialize();

        var async = !!callback;

        var mBody =
           ["<request i:type='a:UpdateRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
            "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
            "<a:KeyValuePairOfstringanyType>",
                "<b:key>Target</b:key>",
                request,
                "</a:KeyValuePairOfstringanyType>",
                "</a:Parameters>",
                "<a:RequestId i:nil='true' />",
                "<a:RequestName>Update</a:RequestName>",
            "</request>"].join("");

        return doRequest(mBody, "Execute", async, function (resultXml) {
            var responseText = selectSingleNodeText(resultXml, "//a:Results");
            var result = crmXmlDecode(responseText);

            if (!async)
                return result;
            else
                callback(result);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var sDelete = function (entityName, id, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to delete a record.
        ///</summary>
        ///<param name="entityName" type="String">
        /// A JavaScript String corresponding to the Schema name of
        /// entity that is used for delete operations.
        /// </param>
        ///<param name="id" type="String">
        /// A JavaScript String corresponding to the GUID of
        /// entity that is used for delete operations.
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>

        var request =
        [
             "<request i:type='a:DeleteRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'><a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'><a:KeyValuePairOfstringanyType><b:key>Target</b:key><b:value i:type='a:EntityReference'><a:Id>",
                  id, "</a:Id><a:LogicalName>",
                  entityName, "</a:LogicalName><a:Name i:nil='true' /></b:value></a:KeyValuePairOfstringanyType></a:Parameters><a:RequestId i:nil='true' /><a:RequestName>Delete</a:RequestName></request>"
        ].join("");

        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var responseText = selectSingleNodeText(resultXml, "//a:Results");
            var result = crmXmlDecode(responseText);

            if (!async)
                return result;
            else
                callback(result);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var execute = function (request, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to execute a soap request.
        ///</summary>
        ///<param name="request" type="String">
        /// A JavaScript string corresponding to the soap request
        /// that are valid for execute operations.
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>
        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            if (!async)
                return resultXml;
            else
                callback(resultXml);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };


    var fetchMore = function (fetchCoreXml, pageNumber, pageCookie, fetchResults) {

        //Build new query
        var moreFetchXml =
                [
                    "<fetch mapping='logical' page='" + pageNumber + "' count='5000' paging-cookie='" + pageCookie + "'>",
                    fetchCoreXml.replace(/\"/g, "'"),
                    "</fetch>"
                ].join("");

        var moreMsgBody = [
               "<request i:type='a:RetrieveMultipleRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
                   "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                       "<a:KeyValuePairOfstringanyType>",
                           "<b:key>Query</b:key>",
                           "<b:value i:type='a:FetchExpression'>",
                               "<a:Query>", crmXmlEncode(moreFetchXml), "</a:Query>",
                           "</b:value>",
                       "</a:KeyValuePairOfstringanyType>",
                   "</a:Parameters>",
                   "<a:RequestId i:nil='true'/>",
                   "<a:RequestName>RetrieveMultiple</a:RequestName>",
               "</request>"
        ].join("");


        return doRequest(moreMsgBody, "Execute", false, function (moreResultXml) {
            var newFetchResult = selectSingleNode(moreResultXml, "//a:Entities");

            var newMoreRecords = (selectSingleNodeText(moreResultXml, "//a:MoreRecords") === "true");

            for (var iii = 0, nLength = newFetchResult.childNodes.length; iii < nLength; iii++) {
                var entity = new businessEntity();

                entity.deserialize(newFetchResult.childNodes[iii]);
                fetchResults.push(entity);
            }

            if (newMoreRecords) {
                pageNumber += 1;
                var newPageCookie = selectSingleNodeText(moreResultXml, "//a:PagingCookie").replace(/\"/g, '\'').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&quot;');;

                fetchMore(fetchCoreXml, pageNumber, newPageCookie, fetchResults);
            } else {
                return fetchResults;
            }
        });
    };


    var fetch = function (fetchCore, fetchAll, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to do a fetch request.
        ///</summary>
        ///<param name="fetchCore" type="String">
        /// A JavaScript String containing serialized XML using the FetchXML schema.
        /// For efficiency, start with the "entity" node.
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>

        var fetchXml = fetchCore;

        if (fetchCore.slice(0, 7) === "<entity") {
            fetchXml =
                [
                   "<fetch mapping='logical'>",
                        fetchCore.replace(/\"/g, "'"),
                   "</fetch>"
                ].join("");
        } else {
            var isAggregate = (fetchCore.indexOf("aggregate=") !== -1);
            var isLimitedReturn = (fetchCore.indexOf("page='1'") !== -1 && fetchCore.indexOf("count='") !== -1);

            var distinctPos = fetchCore.indexOf("distinct=");
            var isDistinct = (distinctPos !== -1);
            var valQuotes = fetchCore.substring(distinctPos + 9, distinctPos + 10);
            var distinctValue = isDistinct
                ? fetchCore.substring(fetchCore.indexOf("distinct=") + 10, fetchCore.indexOf(valQuotes, fetchCore.indexOf("distinct=") + 10))
                : "false";
            var xmlDoc = xmlParser(fetchCore);
            var fetchEntity = selectSingleNode(xmlDoc, "//entity");
            if (fetchEntity === null) {
                throw new Error("XrmServiceToolkit.Fetch: No 'entity' node in the provided FetchXML.");
            }
            var fetchCoreDom = fetchEntity;
            try {
                fetchCore = xmlToString(fetchCoreDom).replace(/\"/g, "'");
            }
            catch (error) {
                if (fetchCoreDom !== undefined && fetchCoreDom.xml) {
                    fetchCore = fetchCoreDom.xml.replace(/\"/g, "'");
                }
                else {
                    throw new Error("XrmServiceToolkit.Fetch: This client does not provide the necessary XML features to continue.");
                }
            }

            if (!isAggregate && !isLimitedReturn) {
                fetchXml =
                 [
                     "<fetch mapping='logical' distinct='" + (isDistinct ? distinctValue : "false") + "' >",
                     fetchCore,
                     "</fetch>"
                 ].join("");
            }
        }

        var request = [
               "<request i:type='a:RetrieveMultipleRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
                   "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                       "<a:KeyValuePairOfstringanyType>",
                           "<b:key>Query</b:key>",
                           "<b:value i:type='a:FetchExpression'>",
                               "<a:Query>", crmXmlEncode(fetchXml), "</a:Query>",
                           "</b:value>",
                       "</a:KeyValuePairOfstringanyType>",
                   "</a:Parameters>",
                   "<a:RequestId i:nil='true'/>",
                   "<a:RequestName>RetrieveMultiple</a:RequestName>",
               "</request>"
        ].join("");

        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var fetchResult = selectSingleNode(resultXml, "//a:Entities");
            var moreRecords = (selectSingleNodeText(resultXml, "//a:MoreRecords") === "true");

            var fetchResults = [];
            if (fetchResult != null) {
                for (var ii = 0, olength = fetchResult.childNodes.length; ii < olength; ii++) {
                    var entity = new businessEntity();

                    entity.deserialize(fetchResult.childNodes[ii]);
                    fetchResults.push(entity);
                }

                if (fetchAll && moreRecords) {
                    var pageCookie = selectSingleNodeText(resultXml, "//a:PagingCookie").replace(/\"/g, '\'').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&quot;');

                    fetchMore(fetchCore, 2, pageCookie, fetchResults);
                }

                if (!async)
                    return fetchResults;
                else
                    callback(fetchResults);
            }
            // ReSharper disable once NotAllPathsReturnValue
        });
    };

    var retrieve = function (entityName, id, columnSet, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to retrieve a record.
        ///</summary>
        ///<param name="entityName" type="String">
        /// A JavaScript String corresponding to the Schema name of
        /// entity that is used for retrieve operations.
        /// </param>
        ///<param name="id" type="String">
        /// A JavaScript String corresponding to the GUID of
        /// entity that is used for retrieve operations.
        /// </param>
        ///<param name="columnSet" type="Array">
        /// A JavaScript Array corresponding to the attributes of
        /// entity that is used for retrieve operations.
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>
        var attributes = "";
        // ReSharper disable AssignedValueIsNeverUsed
        var query = "";
        // ReSharper restore AssignedValueIsNeverUsed
        if (columnSet != null) {
            for (var i = 0, ilength = columnSet.length; i < ilength; i++) {
                attributes += "<c:string>" + columnSet[i] + "</c:string>";
            }
            query = "<a:AllColumns>false</a:AllColumns>" +
                    "<a:Columns xmlns:c='http://schemas.microsoft.com/2003/10/Serialization/Arrays'>" +
                        attributes +
                    "</a:Columns>";
        }
        else {
            query = "<a:AllColumns>true</a:AllColumns><a:Columns xmlns:b='http://schemas.microsoft.com/2003/10/Serialization/Arrays' />";
        }

        var msgBody =
            [
               "<request i:type='a:RetrieveRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
                "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                  "<a:KeyValuePairOfstringanyType>",
                    "<b:key>Target</b:key>",
                    "<b:value i:type='a:EntityReference'>",
                      "<a:Id>", encodeValue(id), "</a:Id>",
                      "<a:LogicalName>", entityName, "</a:LogicalName>",
                      "<a:Name i:nil='true' />",
                    "</b:value>",
                  "</a:KeyValuePairOfstringanyType>",
                  "<a:KeyValuePairOfstringanyType>",
                    "<b:key>ColumnSet</b:key>",
                    "<b:value i:type='a:ColumnSet'>",
                      query,
                    "</b:value>",
                  "</a:KeyValuePairOfstringanyType>",
                "</a:Parameters>",
                "<a:RequestId i:nil='true' />",
                "<a:RequestName>Retrieve</a:RequestName>",
              "</request>"
            ].join("");

        var async = !!callback;

        return doRequest(msgBody, "Execute", !!callback, function (resultXml) {
            var retrieveResult = selectSingleNode(resultXml, "//b:value");
            var entity = new businessEntity();
            entity.deserialize(retrieveResult);

            if (!async)
                return entity;
            else
                callback(entity);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var retrieveMultiple = function (query, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to do a retrieveMultiple request.
        ///</summary>
        ///<param name="query" type="String">
        /// A JavaScript String with properties corresponding to the retrievemultiple request
        /// that are valid for retrievemultiple operations.
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>

        var request = [
           "<request i:type='a:RetrieveMultipleRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
               "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                   "<a:KeyValuePairOfstringanyType>",
                       "<b:key>Query</b:key>",
                       "<b:value i:type='a:QueryExpression'>",
                           query,
                       "</b:value>",
                   "</a:KeyValuePairOfstringanyType>",
               "</a:Parameters>",
               "<a:RequestId i:nil='true'/>",
               "<a:RequestName>RetrieveMultiple</a:RequestName>",
           "</request>"
        ].join("");

        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var resultNodes = selectSingleNode(resultXml, "//a:Entities");

            var retriveMultipleResults = [];

            for (var i = 0, ilength = resultNodes.childNodes.length; i < ilength; i++) {
                var entity = new businessEntity();

                entity.deserialize(resultNodes.childNodes[i]);
                retriveMultipleResults[i] = entity;
            }

            if (!async)
                return retriveMultipleResults;
            else
                callback(retriveMultipleResults);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var joinArray = function (prefix, array, suffix) {
        var output = [];
        for (var i = 0, ilength = array.length; i < ilength; i++) {
            if (array[i] !== "" && array[i] != undefined) {
                output.push(prefix, array[i], suffix);
            }
        }
        return output.join("");
    };

    var joinConditionPair = function (attributes, values) {
        var output = [];
        for (var i = 0, ilength = attributes.length; i < ilength; i++) {
            if (attributes[i] !== "") {
                var value1 = values[i];
                if (typeof value1 == typeof []) {
                    output.push("<condition attribute='", attributes[i], "' operator='in' >");

                    for (var valueIndex in value1) {
                        if (value1.hasOwnProperty(valueIndex)) {
                            var value = encodeValue(value1[valueIndex]);
                            output.push("<value>" + value + "</value>");
                        }
                    }

                    output.push("</condition>");
                }
                else if (typeof value1 == typeof "") {
                    output.push("<condition attribute='", attributes[i], "' operator='eq' value='", encodeValue(value1), "' />");
                }
            }
        }
        return output.join("");
    };

    var isArray = function (input) {
        return input.constructor.toString().indexOf("Array") !== -1;
    };

    var queryByAttribute = function (queryOptions, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to do a queryByAttribute request.
        ///</summary>
        ///<param name="queryOptions" type="Object">
        /// A JavaScript Object with properties corresponding to the queryByAttribute Criteria
        /// that are valid for queryByAttribute operations.
        /// queryOptions.entityName is a string represents the name of the entity
        /// queryOptions.attributes is a array represents the attributes of the entity to query
        /// queryOptions.values is a array represents the values of the attributes to query
        /// queryOptions.columnSet is a array represents the attributes of the entity to return
        /// queryOptions.orderBy is a array represents the order conditions of the results
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>
        var entityName = queryOptions.entityName;
        var attributes = queryOptions.attributes;
        var values = queryOptions.values;
        var columnSet = queryOptions.columnSet;
        var orderBy = queryOptions.orderBy || '';

        attributes = isArray(attributes) ? attributes : [attributes];
        values = isArray(values) ? values : [values];
        orderBy = (!!orderBy && isArray(orderBy)) ? orderBy : [orderBy];
        columnSet = (!!columnSet && isArray(columnSet)) ? columnSet : [columnSet];

        var xml =
                [
                    "<entity name='", entityName, "'>",
                           joinArray("<attribute name='", columnSet, "' />"),
                           joinArray("<order attribute='", orderBy, "' />"),
                        "<filter>",
                              joinConditionPair(attributes, values),
                        "</filter>",
                    "</entity>"
                ].join("");

        return fetch(xml, false, callback);
    };

    var queryAll = function (queryOptions, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to do a queryAll request. This is to return all records (>5k+).
        /// Consider Performance impact when using this method.
        ///</summary>
        ///<param name="queryOptions" type="Object">
        /// A JavaScript Object with properties corresponding to the queryByAttribute Criteria
        /// that are valid for queryByAttribute operations.
        /// queryOptions.entityName is a string represents the name of the entity
        /// queryOptions.attributes is a array represents the attributes of the entity to query
        /// queryOptions.values is a array represents the values of the attributes to query
        /// queryOptions.columnSet is a array represents the attributes of the entity to return
        /// queryOptions.orderBy is a array represents the order conditions of the results
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>
        var entityName = queryOptions.entityName;
        var attributes = queryOptions.attributes;
        var values = queryOptions.values;
        var columnSet = queryOptions.columnSet;
        var orderBy = queryOptions.orderBy || '';

        attributes = isArray(attributes) ? attributes : [attributes];
        values = isArray(values) ? values : [values];
        orderBy = (!!orderBy && isArray(orderBy)) ? orderBy : [orderBy];
        columnSet = (!!columnSet && isArray(columnSet)) ? columnSet : [columnSet];

        var fetchCore = [
                    "<entity name='", entityName, "'>",
                           joinArray("<attribute name='", columnSet, "' />"),
                           joinArray("<order attribute='", orderBy, "' />"),
                        "<filter>",
                              joinConditionPair(attributes, values),
                        "</filter>",
                    "</entity>"
        ].join("");


        var async = !!callback;

        return fetch(fetchCore, true, async);
    };

    var setState = function (entityName, id, stateCode, statusCode, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to setState of a record.
        ///</summary>
        ///<param name="entityName" type="String">
        /// A JavaScript String corresponding to the Schema name of
        /// entity that is used for setState operations.
        /// </param>
        ///<param name="id" type="String">
        /// A JavaScript String corresponding to the GUID of
        /// entity that is used for setState operations.
        /// </param>
        ///<param name="stateCode" type="Int">
        /// A JavaScript Integer corresponding to the value of
        /// entity state that is used for setState operations.
        /// </param>
        ///<param name="statusCode" type="Int">
        /// A JavaScript Integer corresponding to the value of
        /// entity status that is used for setState operations.
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>
        var request = [
            "<request i:type='b:SetStateRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>",
                "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                    "<a:KeyValuePairOfstringanyType>",
                        "<c:key>EntityMoniker</c:key>",
                        "<c:value i:type='a:EntityReference'>",
                          "<a:Id>", encodeValue(id), "</a:Id>",
                          "<a:LogicalName>", entityName, "</a:LogicalName>",
                          "<a:Name i:nil='true' />",
                        "</c:value>",
                      "</a:KeyValuePairOfstringanyType>",
                      "<a:KeyValuePairOfstringanyType>",
                        "<c:key>State</c:key>",
                        "<c:value i:type='a:OptionSetValue'>",
                          "<a:Value>", stateCode.toString(), "</a:Value>",
                        "</c:value>",
                      "</a:KeyValuePairOfstringanyType>",
                      "<a:KeyValuePairOfstringanyType>",
                        "<c:key>Status</c:key>",
                        "<c:value i:type='a:OptionSetValue'>",
                          "<a:Value>", statusCode.toString(), "</a:Value>",
                        "</c:value>",
                      "</a:KeyValuePairOfstringanyType>",
                "</a:Parameters>",
                "<a:RequestId i:nil='true' />",
                "<a:RequestName>SetState</a:RequestName>",
            "</request>"
        ].join("");

        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult");
            var result = crmXmlDecode(responseText);
            if (!async)
                return result;
            else
                callback(result);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var associate = function (relationshipName, targetEntityName, targetId, relatedEntityName, relatedBusinessEntities, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to associate records.
        ///</summary>
        ///<param name="relationshipName" type="String">
        /// A JavaScript String corresponding to the relationship name
        /// that is used for associate operations.
        /// </param>
        ///<param name="targetEntityName" type="String">
        /// A JavaScript String corresponding to the schema name of the target entity
        /// that is used for associate operations.
        /// </param>
        ///<param name="targetId" type="String">
        /// A JavaScript String corresponding to the GUID of the target entity
        /// that is used for associate operations.
        /// </param>
        ///<param name="relatedEntityName" type="String">
        /// A JavaScript String corresponding to the schema name of the related entity
        /// that is used for associate operations.
        /// </param>
        ///<param name="relationshipBusinessEntities" type="Array">
        /// A JavaScript Array corresponding to the collection of the related entities as BusinessEntity
        /// that is used for associate operations.
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>
        var relatedEntities = relatedBusinessEntities;

        relatedEntities = isArray(relatedEntities) ? relatedEntities : [relatedEntities];

        var output = [];
        for (var i = 0, ilength = relatedEntities.length; i < ilength; i++) {
            if (relatedEntities[i].id !== "") {
                output.push("<a:EntityReference>",
                                "<a:Id>", relatedEntities[i].id, "</a:Id>",
                                "<a:LogicalName>", relatedEntityName, "</a:LogicalName>",
                                "<a:Name i:nil='true' />",
                            "</a:EntityReference>");
            }
        }

        var relatedXml = output.join("");

        var request = [
            "<request i:type='a:AssociateRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
                "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                    "<a:KeyValuePairOfstringanyType>",
                        "<b:key>Target</b:key>",
                        "<b:value i:type='a:EntityReference'>",
                            "<a:Id>", encodeValue(targetId), "</a:Id>",
                            "<a:LogicalName>", targetEntityName, "</a:LogicalName>",
                            "<a:Name i:nil='true' />",
                        "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                    "<a:KeyValuePairOfstringanyType>",
                        "<b:key>Relationship</b:key>",
                        "<b:value i:type='a:Relationship'>",
                            "<a:PrimaryEntityRole>Referenced</a:PrimaryEntityRole>",
                            "<a:SchemaName>", relationshipName, "</a:SchemaName>",
                        "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                    "<a:KeyValuePairOfstringanyType>",
                    "<b:key>RelatedEntities</b:key>",
                    "<b:value i:type='a:EntityReferenceCollection'>",
                        relatedXml,
                    "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                "</a:Parameters>",
                "<a:RequestId i:nil='true' />",
                "<a:RequestName>Associate</a:RequestName>",
            "</request>"
        ].join("");

        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult");
            var result = crmXmlDecode(responseText);
            if (!async)
                return result;
            else
                callback(result);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var disassociate = function (relationshipName, targetEntityName, targetId, relatedEntityName, relatedBusinessEntities, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to disassociate records.
        ///</summary>
        ///<param name="relationshipName" type="String">
        /// A JavaScript String corresponding to the relationship name
        /// that is used for disassociate operations.
        /// </param>
        ///<param name="targetEntityName" type="String">
        /// A JavaScript String corresponding to the schema name of the target entity
        /// that is used for disassociate operations.
        /// </param>
        ///<param name="targetId" type="String">
        /// A JavaScript String corresponding to the GUID of the target entity
        /// that is used for disassociate operations.
        /// </param>
        ///<param name="relatedEntityName" type="String">
        /// A JavaScript String corresponding to the schema name of the related entity
        /// that is used for disassociate operations.
        /// </param>
        ///<param name="relationshipBusinessEntities" type="Array">
        /// A JavaScript Array corresponding to the collection of the related entities as BusinessEntity
        /// that is used for disassociate operations.
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>
        var relatedEntities = relatedBusinessEntities;

        relatedEntities = isArray(relatedEntities) ? relatedEntities : [relatedEntities];

        var output = [];
        for (var i = 0, ilength = relatedEntities.length; i < ilength; i++) {
            if (relatedEntities[i].id !== "") {
                output.push("<a:EntityReference>",
                                "<a:Id>", relatedEntities[i].id, "</a:Id>",
                                "<a:LogicalName>", relatedEntityName, "</a:LogicalName>",
                                "<a:Name i:nil='true' />",
                            "</a:EntityReference>");
            }
        }

        var relatedXml = output.join("");

        var request = [
            "<request i:type='a:DisassociateRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
                "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                    "<a:KeyValuePairOfstringanyType>",
                        "<b:key>Target</b:key>",
                        "<b:value i:type='a:EntityReference'>",
                            "<a:Id>", encodeValue(targetId), "</a:Id>",
                            "<a:LogicalName>", targetEntityName, "</a:LogicalName>",
                            "<a:Name i:nil='true' />",
                        "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                    "<a:KeyValuePairOfstringanyType>",
                        "<b:key>Relationship</b:key>",
                        "<b:value i:type='a:Relationship'>",
                            "<a:PrimaryEntityRole i:nil='true' />",
                            "<a:SchemaName>", relationshipName, "</a:SchemaName>",
                        "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                    "<a:KeyValuePairOfstringanyType>",
                    "<b:key>RelatedEntities</b:key>",
                    "<b:value i:type='a:EntityReferenceCollection'>",
                        relatedXml,
                    "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                "</a:Parameters>",
                "<a:RequestId i:nil='true' />",
                "<a:RequestName>Disassociate</a:RequestName>",
            "</request>"
        ].join("");

        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult");
            var result = crmXmlDecode(responseText);
            if (!async)
                return result;
            else
                callback(result);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var getCurrentUserId = function () {
        ///<summary>
        /// Sends synchronous request to retrieve the GUID of the current user.
        ///</summary>
        var request = [
                "<request i:type='b:WhoAmIRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>",
                "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic' />",
                "<a:RequestId i:nil='true' />",
                "<a:RequestName>WhoAmI</a:RequestName>",
                "</request>"
        ].join("");
        var xmlDoc = doRequest(request, "Execute");

        return getNodeText(selectNodes(xmlDoc, "//b:value")[0]);

    };

    var getCurrentUserBusinessUnitId = function () {
        ///<summary>
        /// Sends synchronous request to retrieve the GUID of the current user's business unit.
        ///</summary>
        var request = ["<request i:type='b:WhoAmIRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>",
                        "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic' />",
                        "<a:RequestId i:nil='true' />",
                        "<a:RequestName>WhoAmI</a:RequestName>",
                      "</request>"].join("");
        var xmlDoc = doRequest(request, "Execute");

        return getNodeText(selectNodes(xmlDoc, "//b:value")[1]);
    };

    var getCurrentUserRoles = function () {
        ///<summary>
        /// Sends synchronous request to retrieve the list of the current user's roles.
        ///</summary>
        var xml =
                [
                    "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>",
                      "<entity name='role'>",
                        "<attribute name='name' />",
                        "<attribute name='businessunitid' />",
                        "<attribute name='roleid' />",
                        "<order attribute='name' descending='false' />" +
                        "<link-entity name='systemuserroles' from='roleid' to='roleid' visible='false' intersect='true'>",
                          "<link-entity name='systemuser' from='systemuserid' to='systemuserid' alias='aa'>",
                            "<filter type='and'>",
                              "<condition attribute='systemuserid' operator='eq-userid' />",
                            "</filter>",
                          "</link-entity>",
                        "</link-entity>",
                      "</entity>",
                    "</fetch>"
                ].join("");

        var fetchResult = fetch(xml);
        var roles = [];

        if (fetchResult !== null && typeof fetchResult != 'undefined') {
            for (var i = 0, ilength = fetchResult.length; i < ilength; i++) {
                roles[i] = fetchResult[i].attributes["name"].value;
            }
        }

        return roles;
    };

    var isCurrentUserInRole = function () {
        ///<summary>
        /// Sends synchronous request to check if the current user has certain roles
        /// Passes name of role as arguments. For example, IsCurrentUserInRole('System Administrator')
        /// Returns true or false.
        ///</summary>
        var roles = getCurrentUserRoles();
        for (var i = 0, ilength = roles.length; i < ilength; i++) {
            for (var j = 0, jlength = arguments.length; j < jlength; j++) {
                if (roles[i] === arguments[j]) {
                    return true;
                }
            }
        }

        return false;
    };

    var assign = function (targetEntityName, targetId, assigneeEntityName, assigneeId, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to assign an existing record to a user / a team.
        ///</summary>
        ///<param name="targetEntityName" type="String">
        /// A JavaScript String corresponding to the schema name of the target entity
        /// that is used for assign operations.
        /// </param>
        ///<param name="targetId" type="String">
        /// A JavaScript String corresponding to the GUID of the target entity
        /// that is used for assign operations.
        /// </param>
        ///<param name="assigneeEntityName" type="String">
        /// A JavaScript String corresponding to the schema name of the assignee entity
        /// that is used for assign operations.
        /// </param>
        ///<param name="assigneeId" type="String">
        /// A JavaScript String corresponding to the GUID of the assignee entity
        /// that is used for assign operations.
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>

        var request = ["<request i:type='b:AssignRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>",
                        "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                          "<a:KeyValuePairOfstringanyType>",
                            "<c:key>Target</c:key>",
                            "<c:value i:type='a:EntityReference'>",
                              "<a:Id>", encodeValue(targetId), "</a:Id>",
                              "<a:LogicalName>", targetEntityName, "</a:LogicalName>",
                              "<a:Name i:nil='true' />",
                            "</c:value>",
                          "</a:KeyValuePairOfstringanyType>",
                          "<a:KeyValuePairOfstringanyType>",
                            "<c:key>Assignee</c:key>",
                            "<c:value i:type='a:EntityReference'>",
                              "<a:Id>", encodeValue(assigneeId), "</a:Id>",
                              "<a:LogicalName>", assigneeEntityName, "</a:LogicalName>",
                              "<a:Name i:nil='true' />",
                            "</c:value>",
                          "</a:KeyValuePairOfstringanyType>",
                        "</a:Parameters>",
                        "<a:RequestId i:nil='true' />",
                        "<a:RequestName>Assign</a:RequestName>",
                      "</request>"].join("");
        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult");
            var result = crmXmlDecode(responseText);
            if (!async)
                return result;
            else
                callback(result);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var grantAccess = function (accessOptions, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to do a grantAccess request.
        /// Levels of Access Options are: AppendAccess, AppendToAccess, AssignAccess, CreateAccess, DeleteAccess, None, ReadAccess, ShareAccess, and WriteAccess
        ///</summary>
        ///<param name="accessOptions" type="Object">
        /// A JavaScript Object with properties corresponding to the grantAccess Criteria
        /// that are valid for grantAccess operations.
        /// accessOptions.targetEntityName is a string represents the name of the target entity
        /// accessOptions.targetEntityId is a string represents the GUID of the target entity
        /// accessOptions.principalEntityName is a string represents the name of the principal entity
        /// accessOptions.principalEntityId is a string represents the GUID of the principal entity
        /// accessOptions.accessRights is a array represents the access conditions of the results
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>

        var targetEntityName = accessOptions.targetEntityName;
        var targetEntityId = accessOptions.targetEntityId;
        var principalEntityName = accessOptions.principalEntityName;
        var principalEntityId = accessOptions.principalEntityId;
        var accessRights = accessOptions.accessRights;

        accessRights = isArray(accessRights) ? accessRights : [accessRights];

        var accessRightString = "";
        for (var i = 0, ilength = accessRights.length; i < ilength; i++) {
            accessRightString += encodeValue(accessRights[i]) + " ";
        }

        var request = ["<request i:type='b:GrantAccessRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>",
                        "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                          "<a:KeyValuePairOfstringanyType>",
                            "<c:key>Target</c:key>",
                            "<c:value i:type='a:EntityReference'>",
                              "<a:Id>", encodeValue(targetEntityId), "</a:Id>",
                              "<a:LogicalName>", targetEntityName, "</a:LogicalName>",
                              "<a:Name i:nil='true' />",
                            "</c:value>",
                          "</a:KeyValuePairOfstringanyType>",
                          "<a:KeyValuePairOfstringanyType>",
                            "<c:key>PrincipalAccess</c:key>",
                            "<c:value i:type='b:PrincipalAccess'>",
                              "<b:AccessMask>", accessRightString, "</b:AccessMask>",
                              "<b:Principal>",
                                "<a:Id>", encodeValue(principalEntityId), "</a:Id>",
                                "<a:LogicalName>", principalEntityName, "</a:LogicalName>",
                                "<a:Name i:nil='true' />",
                              "</b:Principal>",
                            "</c:value>",
                          "</a:KeyValuePairOfstringanyType>",
                        "</a:Parameters>",
                        "<a:RequestId i:nil='true' />",
                        "<a:RequestName>GrantAccess</a:RequestName>",
                    "</request>"].join("");
        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult");
            var result = crmXmlDecode(responseText);
            if (!async)
                return result;
            else
                callback(result);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var modifyAccess = function (accessOptions, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to do a modifyAccess request.
        /// Levels of Access Options are: AppendAccess, AppendToAccess, AssignAccess, CreateAccess, DeleteAccess, None, ReadAccess, ShareAccess, and WriteAccess
        ///</summary>
        ///<param name="accessOptions" type="Object">
        /// A JavaScript Object with properties corresponding to the modifyAccess Criteria
        /// that are valid for modifyAccess operations.
        /// accessOptions.targetEntityName is a string represents the name of the target entity
        /// accessOptions.targetEntityId is a string represents the GUID of the target entity
        /// accessOptions.principalEntityName is a string represents the name of the principal entity
        /// accessOptions.principalEntityId is a string represents the GUID of the principal entity
        /// accessOptions.accessRights is a array represents the access conditions of the results
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>

        var targetEntityName = accessOptions.targetEntityName;
        var targetEntityId = accessOptions.targetEntityId;
        var principalEntityName = accessOptions.principalEntityName;
        var principalEntityId = accessOptions.principalEntityId;
        var accessRights = accessOptions.accessRights;

        accessRights = isArray(accessRights) ? accessRights : [accessRights];

        var accessRightString = "";
        for (var i = 0, ilength = accessRights.length; i < ilength; i++) {
            accessRightString += encodeValue(accessRights[i]) + " ";
        }

        var request = ["<request i:type='b:ModifyAccessRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>",
                        "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                          "<a:KeyValuePairOfstringanyType>",
                            "<c:key>Target</c:key>",
                            "<c:value i:type='a:EntityReference'>",
                              "<a:Id>", encodeValue(targetEntityId), "</a:Id>",
                              "<a:LogicalName>", targetEntityName, "</a:LogicalName>",
                              "<a:Name i:nil='true' />",
                            "</c:value>",
                          "</a:KeyValuePairOfstringanyType>",
                          "<a:KeyValuePairOfstringanyType>",
                            "<c:key>PrincipalAccess</c:key>",
                            "<c:value i:type='b:PrincipalAccess'>",
                              "<b:AccessMask>", accessRightString, "</b:AccessMask>",
                              "<b:Principal>",
                                "<a:Id>", encodeValue(principalEntityId), "</a:Id>",
                                "<a:LogicalName>", principalEntityName, "</a:LogicalName>",
                                "<a:Name i:nil='true' />",
                              "</b:Principal>",
                            "</c:value>",
                          "</a:KeyValuePairOfstringanyType>",
                        "</a:Parameters>",
                        "<a:RequestId i:nil='true' />",
                        "<a:RequestName>ModifyAccess</a:RequestName>",
                    "</request>"].join("");
        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult");
            var result = crmXmlDecode(responseText);
            if (!async)
                return result;
            else
                callback(result);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var revokeAccess = function (accessOptions, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to do a revokeAccess request.
        ///</summary>
        ///<param name="accessOptions" type="Object">
        /// A JavaScript Object with properties corresponding to the revokeAccess Criteria
        /// that are valid for revokeAccess operations.
        /// accessOptions.targetEntityName is a string represents the name of the target entity
        /// accessOptions.targetEntityId is a string represents the GUID of the target entity
        /// accessOptions.revokeeEntityName is a string represents the name of the revokee entity
        /// accessOptions.revokeeEntityId is a string represents the GUID of the revokee entity
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>

        var targetEntityName = accessOptions.targetEntityName;
        var targetEntityId = accessOptions.targetEntityId;
        var revokeeEntityName = accessOptions.revokeeEntityName;
        var revokeeEntityId = accessOptions.revokeeEntityId;

        var request = ["<request i:type='b:RevokeAccessRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>",
                        "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                          "<a:KeyValuePairOfstringanyType>",
                            "<c:key>Target</c:key>",
                            "<c:value i:type='a:EntityReference'>",
                              "<a:Id>", encodeValue(targetEntityId), "</a:Id>",
                              "<a:LogicalName>", targetEntityName, "</a:LogicalName>",
                              "<a:Name i:nil='true' />",
                            "</c:value>",
                          "</a:KeyValuePairOfstringanyType>",
                          "<a:KeyValuePairOfstringanyType>",
                            "<c:key>Revokee</c:key>",
                            "<c:value i:type='a:EntityReference'>",
                              "<a:Id>", encodeValue(revokeeEntityId), "</a:Id>",
                              "<a:LogicalName>", revokeeEntityName, "</a:LogicalName>",
                              "<a:Name i:nil='true' />",
                            "</c:value>",
                          "</a:KeyValuePairOfstringanyType>",
                        "</a:Parameters>",
                        "<a:RequestId i:nil='true' />",
                        "<a:RequestName>RevokeAccess</a:RequestName>",
                    "</request>"].join("");
        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult");
            var result = crmXmlDecode(responseText);
            if (!async)
                return result;
            else
                callback(result);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var retrievePrincipalAccess = function (accessOptions, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to do a retrievePrincipalAccess request.
        ///</summary>
        ///<param name="accessOptions" type="Object">
        /// A JavaScript Object with properties corresponding to the retrievePrincipalAccess Criteria
        /// that are valid for retrievePrincipalAccess operations.
        /// accessOptions.targetEntityName is a string represents the name of the target entity
        /// accessOptions.targetEntityId is a string represents the GUID of the target entity
        /// accessOptions.principalEntityName is a string represents the name of the principal entity
        /// accessOptions.principalEntityId is a string represents the GUID of the principal entity
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>

        var targetEntityName = accessOptions.targetEntityName;
        var targetEntityId = accessOptions.targetEntityId;
        var principalEntityName = accessOptions.principalEntityName;
        var principalEntityId = accessOptions.principalEntityId;

        var request = ["<request i:type='b:RetrievePrincipalAccessRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>",
                        "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                          "<a:KeyValuePairOfstringanyType>",
                            "<c:key>Target</c:key>",
                            "<c:value i:type='a:EntityReference'>",
                              "<a:Id>", encodeValue(targetEntityId), "</a:Id>",
                              "<a:LogicalName>", targetEntityName, "</a:LogicalName>",
                              "<a:Name i:nil='true' />",
                            "</c:value>",
                          "</a:KeyValuePairOfstringanyType>",
                          "<a:KeyValuePairOfstringanyType>",
                            "<c:key>Principal</c:key>",
                            "<c:value i:type='a:EntityReference'>",
                              "<a:Id>", encodeValue(principalEntityId), "</a:Id>",
                              "<a:LogicalName>", principalEntityName, "</a:LogicalName>",
                              "<a:Name i:nil='true' />",
                            "</c:value>",
                          "</a:KeyValuePairOfstringanyType>",
                        "</a:Parameters>",
                        "<a:RequestId i:nil='true' />",
                        "<a:RequestName>RetrievePrincipalAccess</a:RequestName>",
                    "</request>"].join("");
        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var result = selectSingleNodeText(resultXml, "//b:value");
            if (!async)
                return result;
            else
                callback(result);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    // Added in 1.4.1 for metadata retrieval 
    // Inspired From Microsoft SDK code to retrieve Metadata using JavaScript
    // Copyright (C) Microsoft Corporation.  All rights reserved.
    var arrayElements = ["Attributes",
                         "ManyToManyRelationships",
                         "ManyToOneRelationships",
                         "OneToManyRelationships",
                         "Privileges",
                         "LocalizedLabels",
                         "Options",
                         "Targets"];

    var isMetadataArray = function (elementName) {
        for (var i = 0, ilength = arrayElements.length; i < ilength; i++) {
            if (elementName === arrayElements[i]) {
                return true;
            }
        }
        return false;
    };

    var getNodeName = function (node) {
        if (typeof (node.baseName) != "undefined") {
            return node.baseName;
        }
        else {
            return node.localName;
        }
    };

    var objectifyNode = function (node) {
        //Check for null
        if (node.attributes != null && node.attributes.length === 1) {
            if (node.attributes.getNamedItem("i:nil") != null && node.attributes.getNamedItem("i:nil").nodeValue === "true") {
                return null;
            }
        }

        //Check if it is a value
        if ((node.firstChild != null) && (node.firstChild.nodeType === 3)) {
            var nodeName = getNodeName(node);

            switch (nodeName) {
                //Integer Values        
                case "ActivityTypeMask":
                case "ObjectTypeCode":
                case "ColumnNumber":
                case "DefaultFormValue":
                case "MaxValue":
                case "MinValue":
                case "MaxLength":
                case "Order":
                case "Precision":
                case "PrecisionSource":
                case "LanguageCode":
                    return parseInt(node.firstChild.nodeValue, 10);
                    // Boolean values
                case "AutoRouteToOwnerQueue":
                case "CanBeChanged":
                case "CanTriggerWorkflow":
                case "IsActivity":
                case "IsActivityParty":
                case "IsAvailableOffline":
                case "IsChildEntity":
                case "IsCustomEntity":
                case "IsCustomOptionSet":
                case "IsDocumentManagementEnabled":
                case "IsEnabledForCharts":
                case "IsGlobal":
                case "IsImportable":
                case "IsIntersect":
                case "IsManaged":
                case "IsReadingPaneEnabled":
                case "IsValidForAdvancedFind":
                case "CanBeSecuredForCreate":
                case "CanBeSecuredForRead":
                case "CanBeSecuredForUpdate":
                case "IsCustomAttribute":
                case "IsPrimaryId":
                case "IsPrimaryName":
                case "IsSecured":
                case "IsValidForCreate":
                case "IsValidForRead":
                case "IsValidForUpdate":
                case "IsCustomRelationship":
                case "CanBeBasic":
                case "CanBeDeep":
                case "CanBeGlobal":
                case "CanBeLocal":
                    return (node.firstChild.nodeValue === "true") ? true : false;
                    //OptionMetadata.Value and BooleanManagedProperty.Value and AttributeRequiredLevelManagedProperty.Value
                case "Value":
                    //BooleanManagedProperty.Value
                    if ((node.firstChild.nodeValue === "true") || (node.firstChild.nodeValue === "false")) {
                        return (node.firstChild.nodeValue === "true") ? true : false;
                    }
                    //AttributeRequiredLevelManagedProperty.Value
                    if (
                          (node.firstChild.nodeValue === "ApplicationRequired") ||
                          (node.firstChild.nodeValue === "None") ||
                          (node.firstChild.nodeValue === "Recommended") ||
                          (node.firstChild.nodeValue === "SystemRequired")
                       ) {
                        return node.firstChild.nodeValue;
                    }
                    else {
                        //OptionMetadata.Value
                        return parseInt(node.firstChild.nodeValue, 10);
                    }
                    // ReSharper disable JsUnreachableCode
                    break;
                    // ReSharper restore JsUnreachableCode   
                    //String values        
                default:
                    return node.firstChild.nodeValue;
            }

        }

        //Check if it is a known array
        if (isMetadataArray(getNodeName(node))) {
            var arrayValue = [];
            for (var iii = 0, tempLength = node.childNodes.length; iii < tempLength; iii++) {
                var objectTypeName;
                if ((node.childNodes[iii].attributes != null) && (node.childNodes[iii].attributes.getNamedItem("i:type") != null)) {
                    objectTypeName = node.childNodes[iii].attributes.getNamedItem("i:type").nodeValue.split(":")[1];
                }
                else {

                    objectTypeName = getNodeName(node.childNodes[iii]);
                }

                var b = objectifyNode(node.childNodes[iii]);
                b._type = objectTypeName;
                arrayValue.push(b);

            }

            return arrayValue;
        }

        //Null entity description labels are returned as <label/> - not using i:nil = true;
        if (node.childNodes.length === 0) {
            return null;
        }

        //Otherwise return an object
        var c = {};
        if (node.attributes.getNamedItem("i:type") != null) {
            c._type = node.attributes.getNamedItem("i:type").nodeValue.split(":")[1];
        }
        for (var i = 0, ilength = node.childNodes.length; i < ilength; i++) {
            if (node.childNodes[i].nodeType === 3) {
                c[getNodeName(node.childNodes[i])] = node.childNodes[i].nodeValue;
            }
            else {
                c[getNodeName(node.childNodes[i])] = objectifyNode(node.childNodes[i]);
            }

        }
        return c;
    };

    var retrieveAllEntitiesMetadata = function (entityFilters, retrieveIfPublished, callback) {
        ///<summary>
        /// Sends an synchronous/asynchronous RetrieveAllEntitieMetadata Request to retrieve all entities metadata in the system
        ///</summary>
        ///<returns>Entity Metadata Collection</returns>
        ///<param name="entityFilters" type="Array">
        /// The filter array available to filter which data is retrieved. Case Sensitive filters [Entity,Attributes,Privileges,Relationships]
        /// Include only those elements of the entity you want to retrieve in the array. Retrieving all parts of all entities may take significant time.
        ///</param>
        ///<param name="retrieveIfPublished" type="Boolean">
        /// Sets whether to retrieve the metadata that has not been published.
        ///</param>
        ///<param name="callBack" type="Function">
        /// The function that will be passed through and be called by a successful response.
        /// This function also used as an indicator if the function is synchronous/asynchronous
        ///</param>

        entityFilters = isArray(entityFilters) ? entityFilters : [entityFilters];
        var entityFiltersString = "";
        for (var iii = 0, templength = entityFilters.length; iii < templength; iii++) {
            entityFiltersString += encodeValue(entityFilters[iii]) + " ";
        }

        var request = [
             "<request i:type=\"a:RetrieveAllEntitiesRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">",
              "<a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">",
               "<a:KeyValuePairOfstringanyType>",
                "<b:key>EntityFilters</b:key>",
                "<b:value i:type=\"c:EntityFilters\" xmlns:c=\"http://schemas.microsoft.com/xrm/2011/Metadata\">" + encodeValue(entityFiltersString) + "</b:value>",
               "</a:KeyValuePairOfstringanyType>",
               "<a:KeyValuePairOfstringanyType>",
                "<b:key>RetrieveAsIfPublished</b:key>",
                "<b:value i:type=\"c:boolean\" xmlns:c=\"http://www.w3.org/2001/XMLSchema\">" + encodeValue(retrieveIfPublished.toString()) + "</b:value>",
               "</a:KeyValuePairOfstringanyType>",
              "</a:Parameters>",
              "<a:RequestId i:nil=\"true\" />",
              "<a:RequestName>RetrieveAllEntities</a:RequestName>",
            "</request>"].join("");

        var async = !!callback;
        return doRequest(request, "Execute", async, function (resultXml) {
            var response = selectNodes(resultXml, "//c:EntityMetadata");

            var results = [];
            for (var i = 0, ilength = response.length; i < ilength; i++) {
                var a = objectifyNode(response[i]);
                a._type = "EntityMetadata";
                results.push(a);
            }

            if (!async)
                return results;
            else
                callback(results);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var retrieveEntityMetadata = function (entityFilters, logicalName, retrieveIfPublished, callback) {
        ///<summary>
        /// Sends an synchronous/asynchronous RetreiveEntityMetadata Request to retrieve a particular entity metadata in the system
        ///</summary>
        ///<returns>Entity Metadata</returns>
        ///<param name="entityFilters" type="String">
        /// The filter string available to filter which data is retrieved. Case Sensitive filters [Entity,Attributes,Privileges,Relationships]
        /// Include only those elements of the entity you want to retrieve in the array. Retrieving all parts of all entities may take significant time.
        ///</param>
        ///<param name="logicalName" type="String">
        /// The string of the entity logical name
        ///</param>
        ///<param name="retrieveIfPublished" type="Boolean">
        /// Sets whether to retrieve the metadata that has not been published.
        ///</param>
        ///<param name="callBack" type="Function">
        /// The function that will be passed through and be called by a successful response.
        /// This function also used as an indicator if the function is synchronous/asynchronous
        ///</param>

        entityFilters = isArray(entityFilters) ? entityFilters : [entityFilters];
        var entityFiltersString = "";
        for (var iii = 0, templength = entityFilters.length; iii < templength; iii++) {
            entityFiltersString += encodeValue(entityFilters[iii]) + " ";
        }

        var request = [
            "<request i:type=\"a:RetrieveEntityRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">",
                "<a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">",
                    "<a:KeyValuePairOfstringanyType>",
                        "<b:key>EntityFilters</b:key>",
                        "<b:value i:type=\"c:EntityFilters\" xmlns:c=\"http://schemas.microsoft.com/xrm/2011/Metadata\">", encodeValue(entityFiltersString), "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                    "<a:KeyValuePairOfstringanyType>",
                        "<b:key>MetadataId</b:key>",
                        "<b:value i:type=\"c:guid\"  xmlns:c=\"http://schemas.microsoft.com/2003/10/Serialization/\">", encodeValue("00000000-0000-0000-0000-000000000000"), "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                    "<a:KeyValuePairOfstringanyType>",
                        "<b:key>RetrieveAsIfPublished</b:key>",
                        "<b:value i:type=\"c:boolean\" xmlns:c=\"http://www.w3.org/2001/XMLSchema\">", encodeValue(retrieveIfPublished.toString()), "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                    "<a:KeyValuePairOfstringanyType>",
                        "<b:key>LogicalName</b:key>",
                        "<b:value i:type=\"c:string\" xmlns:c=\"http://www.w3.org/2001/XMLSchema\">", encodeValue(logicalName), "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                "</a:Parameters>",
                "<a:RequestId i:nil=\"true\" />",
                "<a:RequestName>RetrieveEntity</a:RequestName>",
             "</request>"].join("");

        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var response = selectNodes(resultXml, "//b:value");

            var results = [];
            for (var i = 0, ilength = response.length; i < ilength; i++) {
                var a = objectifyNode(response[i]);
                a._type = "EntityMetadata";
                results.push(a);
            }

            if (!async)
                return results;
            else
                callback(results);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var retrieveAttributeMetadata = function (entityLogicalName, attributeLogicalName, retrieveIfPublished, callback) {
        ///<summary>
        /// Sends an synchronous/asynchronous RetrieveAttributeMetadata Request to retrieve a particular entity's attribute metadata in the system
        ///</summary>
        ///<returns>Entity Metadata</returns>
        ///<param name="entityLogicalName" type="String">
        /// The string of the entity logical name
        ///</param>
        ///<param name="attributeLogicalName" type="String">
        /// The string of the entity's attribute logical name
        ///</param>
        ///<param name="retrieveIfPublished" type="Boolean">
        /// Sets whether to retrieve the metadata that has not been published.
        ///</param>
        ///<param name="callBack" type="Function">
        /// The function that will be passed through and be called by a successful response.
        /// This function also used as an indicator if the function is synchronous/asynchronous
        ///</param>

        var request = [
             "<request i:type=\"a:RetrieveAttributeRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">",
              "<a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">",
               "<a:KeyValuePairOfstringanyType>",
                "<b:key>EntityLogicalName</b:key>",
                "<b:value i:type=\"c:string\" xmlns:c=\"http://www.w3.org/2001/XMLSchema\">", encodeValue(entityLogicalName), "</b:value>",
               "</a:KeyValuePairOfstringanyType>",
               "<a:KeyValuePairOfstringanyType>",
                "<b:key>MetadataId</b:key>",
                "<b:value i:type=\"ser:guid\"  xmlns:ser=\"http://schemas.microsoft.com/2003/10/Serialization/\">", encodeValue("00000000-0000-0000-0000-000000000000"), "</b:value>",
               "</a:KeyValuePairOfstringanyType>",
                "<a:KeyValuePairOfstringanyType>",
                "<b:key>RetrieveAsIfPublished</b:key>",
              "<b:value i:type=\"c:boolean\" xmlns:c=\"http://www.w3.org/2001/XMLSchema\">", encodeValue(retrieveIfPublished.toString()), "</b:value>",
               "</a:KeyValuePairOfstringanyType>",
               "<a:KeyValuePairOfstringanyType>",
                "<b:key>LogicalName</b:key>",
                "<b:value i:type=\"c:string\"   xmlns:c=\"http://www.w3.org/2001/XMLSchema\">", encodeValue(attributeLogicalName), "</b:value>",
               "</a:KeyValuePairOfstringanyType>",
              "</a:Parameters>",
              "<a:RequestId i:nil=\"true\" />",
              "<a:RequestName>RetrieveAttribute</a:RequestName>",
             "</request>"].join("");

        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var response = selectNodes(resultXml, "//b:value");
            var results = [];
            for (var i = 0, ilength = response.length; i < ilength; i++) {
                var a = objectifyNode(response[i]);
                results.push(a);
            }

            if (!async)
                return results;
            else
                callback(results);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    //Toolkit's Return Static Methods
    return {
        BusinessEntity: businessEntity,
        Execute: execute,
        Fetch: fetch,
        Retrieve: retrieve,
        RetrieveMultiple: retrieveMultiple,
        Create: sCreate,
        Update: sUpdate,
        Delete: sDelete,
        QueryByAttribute: queryByAttribute,
        QueryAll: queryAll,
        SetState: setState,
        Associate: associate,
        Disassociate: disassociate,
        Assign: assign,
        RetrievePrincipalAccess: retrievePrincipalAccess,
        GrantAccess: grantAccess,
        ModifyAccess: modifyAccess,
        RevokeAccess: revokeAccess,
        GetCurrentUserId: getCurrentUserId,
        GetCurrentUserBusinessUnitId: getCurrentUserBusinessUnitId,
        GetCurrentUserRoles: getCurrentUserRoles,
        IsCurrentUserRole: isCurrentUserInRole,
        RetrieveAllEntitiesMetadata: retrieveAllEntitiesMetadata,
        RetrieveEntityMetadata: retrieveEntityMetadata,
        RetrieveAttributeMetadata: retrieveAttributeMetadata
    };
}();

XrmServiceToolkit.Extension = function () {
    // jQuery Load Help function to add tooltip for attribute in CRM 2011. Unsupported because of the usage of DOM object edit.
    //****************************************************
    var alertMessage = function (message) {
        (Xrm.Utility !== undefined && Xrm.Utility.alertDialog !== undefined) ? Xrm.Utility.alertDialog(message) : alert(message);
    };

    var context = function () {
        ///<summary>
        /// Private function to the context object.
        ///</summary>
        ///<returns>Context</returns>
        var oContext;
        if (typeof Xrm != "undefined") {
            oContext = Xrm.Page.context;
        }
        else {
            if (typeof GetGlobalContext != "undefined") {
                oContext = GetGlobalContext();
            } else {
                throw new Error("Context is not available.");
            }
        }
        return oContext;
    };

    var getClientUrl = function () {
        ///<summary>
        /// Private function to return the server URL from the context
        ///</summary>
        ///<returns>String</returns>
        var serverUrl = typeof context().getClientUrl != 'undefined' ? context().getClientUrl() : context().getServerUrl();
        if (serverUrl.match(/\/$/)) {
            serverUrl = serverUrl.substring(0, serverUrl.length - 1);
        }
        return serverUrl;
    };

    var jQueryXrmFieldTooltip = function (filename, bDisplayImg) {
        ///<summary>
        /// A generic configurable method to add tooltip to crm 2011 field. 
        ///</summary>
        ///<param name="filename" type="String">
        /// A JavaScript String corresponding the name of the configuration web resource name in CRM 2011 instance
        /// </param>
        ///<param name="bDisplayImg" type="boolean">
        /// A JavaScript boolean corresponding if display a help image for the tooltip
        /// </param>

        /*
        This function is used add tooltips to any field in CRM2011.

        This function requires the following parameters:
        filename :   name of the XML web resource
        bDisplayImg: boolean to show/hide the help image (true/false)
        Returns: nothing
        Example:  jQueryLoadHelp('cm_xmlhelpfile', true);
        Designed by: http://lambrite.com/?p=221
        Adapted by Geron Profet (www.crmxpg.nl), Jaimie Ji
        Modified by Jaimie Ji with jQuery and cross browser
        */

        if (Xrm.Page.ui.setFormNotification !== undefined) {
            alertMessage('XrmServiceToolkit.Extension.JQueryXrmFieldTooltip is not supported in CRM2013.\nPlease use the out of box functionality');
            return;
        }

        if (typeof jQuery === 'undefined') {
            var errorMessage = ('jQuery is not loaded.\nPlease ensure that jQuery is included\n as web resource in the form load.');
            alertMessage(errorMessage);
            return;
        }

        function registerHelp(entity, attr, txt) {
            var obj = jQuery('#' + attr + '_c').children(':first');
            if (obj != null) {
                var html = '<img id="img_' + attr + '" src="/_imgs/ico/16_help.gif" alt="' + txt + '" width="16" height="16" /><div id="help_' + attr + '" style="visibility: hidden; position: absolute;">: ' + txt + '</div>';
                jQuery(obj).append(html);
                //20110909 GP: added line to hide/show help image
                jQuery('#img_' + attr).css('display', (bDisplayImg) ? 'inline' : 'none');
            }
        }

        //****************************************************
        function parseHelpXml(data) {
            var entity = Xrm.Page.data.entity.getEntityName().toString().toLowerCase();
            var entXml = jQuery("entity[name=" + entity + "]", data);
            jQuery(entXml).children().each(function () {
                var attr = jQuery(this).attr('name');
                var txt = jQuery(this).find('shorthelp').text();
                registerHelp(entity, attr, txt);
            });
        }

        jQuery.support.cors = true;

        jQuery.ajax({
            type: "GET",
            url: getClientUrl() + "/WebResources/" + filename,
            dataType: "xml",
            success: parseHelpXml,
            // ReSharper disable UnusedParameter
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                // ReSharper restore UnusedParameter
                alertMessage('Something is wrong to setup the tooltip for the fields. Please contact your administrator');
            }
        }); //end Ajax

    };

    // Generic Dependent Option Set Function. Changed from CRM 2011 SDK example
    var jQueryXrmDependentOptionSet = function (filename) {
        ///<summary>
        /// A generic configurable method to configure dependent optionset for CRM 2011 instance
        ///</summary>
        ///<param name="filename" type="String">
        /// A JavaScript String corresponding the name of the configuration web resource name in CRM 2011 instance
        /// </param>
        if (typeof jQuery === 'undefined') {
            alertMessage('jQuery is not loaded.\nPlease ensure that jQuery is included\n as web resource in the form load.');
            return;
        }

        // This is the function set on the OnChange event for
        // parent fields.
        // ReSharper disable DuplicatingLocalDeclaration
        function filterDependentField(parentField, childField, jQueryXrmDependentOptionSet) {
            // ReSharper restore DuplicatingLocalDeclaration
            for (var depOptionSet in jQueryXrmDependentOptionSet.config) {
                if (jQueryXrmDependentOptionSet.config.hasOwnProperty(depOptionSet)) {
                    var dependentOptionSet = jQueryXrmDependentOptionSet.config[depOptionSet];
                    /* Match the parameters to the correct dependent optionset mapping*/
                    if ((dependentOptionSet.parent === parentField) && (dependentOptionSet.dependent === childField)) {
                        /* Get references to the related fields*/
                        var parent = Xrm.Page.data.entity.attributes.get(parentField);
                        var child = Xrm.Page.data.entity.attributes.get(childField);

                        var parentControl = Xrm.Page.getControl(parentField);
                        var childControl = Xrm.Page.getControl(childField);
                        /* Capture the current value of the child field*/
                        var currentChildFieldValue = child.getValue();

                        /* If the parent field is null the Child field can be set to null */
                        var controls;
                        var ctrl;
                        if (parent.getValue() === null) {
                            child.setValue(null);
                            child.setSubmitMode("always");
                            child.fireOnChange();

                            // Any attribute may have any number of controls,
                            // so disable each instance.
                            controls = child.controls.get();
                            for (ctrl in controls) {
                                if (controls.hasOwnProperty(ctrl)) {
                                    controls[ctrl].setDisabled(true);
                                }
                            }
                            return;
                        }

                        for (var os in dependentOptionSet.options) {
                            if (dependentOptionSet.options.hasOwnProperty(os)) {
                                var options = dependentOptionSet.options[os];
                                var optionsToShow = options.showOptions;
                                /* Find the Options that corresponds to the value of the parent field. */
                                if (parent.getValue().toString() === options.value.toString()) {
                                    controls = child.controls.get(); /*Enable the field and set the options*/
                                    for (ctrl in controls) {
                                        if (controls.hasOwnProperty(ctrl)) {
                                            controls[ctrl].setDisabled(false);
                                            controls[ctrl].clearOptions();

                                            for (var option in optionsToShow) {
                                                if (optionsToShow.hasOwnProperty(option)) {
                                                    controls[ctrl].addOption(optionsToShow[option]);
                                                }
                                            }
                                        }
                                    }
                                    /*Check whether the current value is valid*/
                                    var bCurrentValueIsValid = false;
                                    var childFieldOptions = optionsToShow;

                                    for (var validOptionIndex in childFieldOptions) {
                                        if (childFieldOptions.hasOwnProperty(validOptionIndex)) {
                                            var optionDataValue = childFieldOptions[validOptionIndex].value;

                                            if (currentChildFieldValue === parseInt(optionDataValue)) {
                                                bCurrentValueIsValid = true;
                                                break;
                                            }
                                        }
                                    }
                                    /*
                            If the value is valid, set it.
                            If not, set the child field to null
                            */
                                    if (bCurrentValueIsValid) {
                                        child.setValue(currentChildFieldValue);
                                    } else {
                                        child.setValue(null);
                                    }
                                    child.setSubmitMode("always");
                                    child.fireOnChange();

                                    if (parentControl.getDisabled() === true) {
                                        childControl.setDisabled(true);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }


        function init(data) {
            var entity = Xrm.Page.data.entity.getEntityName().toString().toLowerCase();
            var configWr = jQuery("entity[name=" + entity + "]", data);

            //Convert the XML Data into a JScript object.
            var parentFields = configWr.children("ParentField");
            var jsConfig = [];
            for (var i = 0, ilength = parentFields.length; i < ilength; i++) {
                var node = parentFields[i];
                var mapping = {};
                mapping.parent = jQuery(node).attr("id");
                mapping.dependent = jQuery(node).children("DependentField:first").attr("id");
                mapping.options = [];
                var options = jQuery(node).children("Option");
                for (var a = 0, alength = options.length; a < alength; a++) {
                    var option = {};
                    option.value = jQuery(options[a]).attr("value");
                    option.showOptions = [];
                    var optionsToShow = jQuery(options[a]).children("ShowOption");
                    for (var b = 0, blength = optionsToShow.length; b < blength; b++) {
                        var optionToShow = {};
                        optionToShow.value = jQuery(optionsToShow[b]).attr("value");
                        optionToShow.text = jQuery(optionsToShow[b]).attr("label"); // Label is not used in the code.

                        option.showOptions.push(optionToShow);
                    }
                    mapping.options.push(option);
                }
                jsConfig.push(mapping);
            }
            // Attach the configuration object to jQueryXrmDependentOptionSet
            // so it will be available for the OnChange events.
            jQueryXrmDependentOptionSet.config = jsConfig;

            //Fire the OnChange event for the mapped optionset fields
            // so that the dependent fields are filtered for the current values.
            for (var depOptionSet in jQueryXrmDependentOptionSet.config) {
                if (jQueryXrmDependentOptionSet.config.hasOwnProperty(depOptionSet)) {
                    var parent = jQueryXrmDependentOptionSet.config[depOptionSet].parent;
                    var child = jQueryXrmDependentOptionSet.config[depOptionSet].dependent;
                    filterDependentField(parent, child, jQueryXrmDependentOptionSet);
                }
            }
        }

        jQuery.support.cors = true;

        jQuery.ajax({
            type: "GET",
            url: getClientUrl() + "/WebResources/" + filename,
            dataType: "xml",
            success: init,
            // ReSharper disable UnusedParameter
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                // ReSharper restore UnusedParameter
                alertMessage('Something is wrong to setup the dependent picklist. Please contact your administrator');
            }
        }); //end Ajax
    };

    var jQueryXrmCustomFilterView = function (filename) {
        ///<summary>
        /// A generic configurable method to add custom filter view to lookup field in crm 2011 instance
        ///</summary>
        ///<param name="filename" type="String">
        /// A JavaScript String corresponding the name of the configuration web resource name in CRM 2011 instance
        /// </param>
        if (typeof jQuery === 'undefined') {
            alertMessage('jQuery is not loaded.\nPlease ensure that jQuery is included\n as web resource in the form load.');
            return;
        }

        function setCustomFilterView(target, entityName, viewName, fetchXml, layoutXml) {
            // use randomly generated GUID Id for our new view
            var viewId = "{1DFB2B35-B07C-44D1-868D-258DEEAB88E2}";

            // add the Custom View to the indicated [lookupFieldName] Control
            Xrm.Page.getControl(target).addCustomView(viewId, entityName, viewName, fetchXml, layoutXml, true);
        }

        function xmlToString(responseXml) {
            var xmlString = '';
            try {
                if (responseXml != null) {
                    if (typeof XMLSerializer !== "undefined" && typeof responseXml.xml === "undefined") {
                        // ReSharper disable InconsistentNaming
                        xmlString = (new XMLSerializer()).serializeToString(responseXml);
                        // ReSharper restore InconsistentNaming
                    } else {
                        if (typeof responseXml.xml !== "undefined") {
                            xmlString = responseXml.xml;
                        }
                        else if (typeof responseXml[0].xml !== "undefined") {
                            xmlString = responseXml[0].xml;
                        }

                    }
                }
            } catch (e) {
                alertMessage("Cannot convert the XML to a string.");
            }
            return xmlString;
        }

        function init(data) {
            var entity = Xrm.Page.data.entity.getEntityName().toString().toLowerCase();
            var configWr = jQuery("entity[name=" + entity + "]", data);

            //Convert the XML Data into a JScript object.
            var targetFields = configWr.children("TargetField");
            var jsConfig = [];
            for (var i = 0, ilength = targetFields.length; i < ilength; i++) {
                var node = targetFields[i];
                var mapping = {};
                mapping.target = jQuery(node).attr("id");
                mapping.entityName = jQuery(node).attr("viewentity");
                mapping.viewName = jQuery(node).attr("viewname");
                mapping.dynamic = jQuery(node).children("dynamic").children();
                mapping.fetchXml = xmlToString(jQuery(node).children("fetch"));
                mapping.layoutXml = xmlToString(jQuery(node).children("grid"));

                jsConfig.push(mapping);
            }
            // Attach the configuration object to JQueryCustomFilterView
            // so it will be available for the OnChange events.
            jQueryXrmCustomFilterView.config = jsConfig;

            //Fire the OnChange event for the mapped fields
            // so that the lookup dialog are changed with the filtered view for the current values.
            for (var customFilterView in jQueryXrmCustomFilterView.config) {
                if (jQueryXrmCustomFilterView.config.hasOwnProperty(customFilterView)) {
                    var target = jQueryXrmCustomFilterView.config[customFilterView].target;
                    var entityName = jQueryXrmCustomFilterView.config[customFilterView].entityName;
                    var viewName = jQueryXrmCustomFilterView.config[customFilterView].viewName;
                    var dynamic = jQueryXrmCustomFilterView.config[customFilterView].dynamic;
                    var fetchXml = jQueryXrmCustomFilterView.config[customFilterView].fetchXml;
                    var layoutXml = jQueryXrmCustomFilterView.config[customFilterView].layoutXml;

                    //TODO: Adding logics for various field and conditions. More tests required. 
                    if (dynamic != null) {
                        for (var a = 0, alength = dynamic.length; a < alength; a++) {
                            var dynamicControlType = Xrm.Page.getControl(jQuery(dynamic).attr('name')).getControlType();
                            var fieldValueType = jQuery(dynamic).attr('fieldvaluetype'); //for optionset, name might be used to filter
                            if (Xrm.Page.getAttribute(jQuery(dynamic).attr('name')).getValue() === null) {
                                alertMessage(jQuery(dynamic).attr('name') + ' does not have a value. Please put validation logic on the field change to call this function. Only use XrmServiceToolkit.Extension.JQueryXrmCustomFilterView when the field has a value.');
                                return;
                            }
                            var dynamicValue = null;
                            switch (dynamicControlType) {
                                case 'standard':
                                    dynamicValue = Xrm.Page.getAttribute(jQuery(dynamic).attr('name')).getValue();
                                    break;
                                case 'optionset':
                                    dynamicValue = (fieldValueType != null && fieldValueType === 'label') ? Xrm.Page.getAttribute(jQuery(dynamic).attr('name')).getSelectionOption().text : Xrm.Page.getAttribute(jQuery(dynamic).attr('name')).getValue();
                                    break;
                                case 'lookup':
                                    dynamicValue = (fieldValueType != null && fieldValueType === 'name') ? Xrm.Page.getAttribute(jQuery(dynamic).attr('name')).getValue()[0].name : Xrm.Page.getAttribute(jQuery(dynamic).attr('name')).getValue()[0].id;
                                    break;
                                default:
                                    alertMessage(jQuery(dynamic).attr('name') + " is not supported for filter lookup view. Please change the configuration.");
                                    break;
                            }

                            var operator = jQuery(dynamic).attr('operator');
                            if (operator === null) {
                                alertMessage('operator is missing in the configuration file. Please fix the issue');
                                return;
                            }
                            var dynamicString = jQuery(dynamic).attr('fetchnote');
                            switch (operator.toLowerCase()) {
                                case 'contains':
                                case 'does not contain':
                                    dynamicValue = '%' + dynamicValue + '%';
                                    break;
                                case 'begins with':
                                case 'does not begin with':
                                    dynamicValue = dynamicValue + '%';
                                    break;
                                case 'ends with':
                                case 'does not end with':
                                    dynamicValue = '%' + dynamicValue;
                                    break;
                                default:
                                    break;
                            }

                            fetchXml = fetchXml.replace(dynamicString, dynamicValue);
                        }
                    }

                    //replace the values if required
                    setCustomFilterView(target, entityName, viewName, fetchXml, layoutXml);
                }
            }
        }

        jQuery.support.cors = true;

        jQuery.ajax({
            type: "GET",
            url: getClientUrl() + "/WebResources/" + filename,
            dataType: "xml",
            success: init,
            // ReSharper disable UnusedParameter
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                // ReSharper restore UnusedParameter
                alertMessage('Something is wrong to setup the custom filter view. Please contact your administrator');
            }
        }); //end Ajax

    };

    // Disable or Enable to insert/edit note for entity. Unsupported because of DOM object edit
    var jQueryXrmFormatNotesControl = function (allowInsert, allowEdit) {
        ///<summary>
        /// A generic configurable method to format the note control in crm 2011 instance
        ///</summary>
        ///<param name="allowInsert" type="Boolean">
        /// A JavaScript boolean to format if the note control allow insert
        /// </param>
        ///<param name="allowEdit" type="Boolean">
        /// A JavaScript boolean to format if the note control allow edit
        /// </param>

        if (Xrm.Page.ui.setFormNotification !== undefined) {
            alertMessage('XrmServiceToolkit.Extension.JQueryXrmFormatNotesControl is not supported in CRM2013');
            return;
        }

        if (typeof jQuery === 'undefined') {
            alertMessage('jQuery is not loaded.\nPlease ensure that jQuery is included\n as web resource in the form load.');
            return;
        }

        jQuery.support.cors = true;

        var notescontrol = jQuery('#notescontrol');
        if (notescontrol === null || notescontrol === undefined) return;
        var url = notescontrol.attr('url');
        //if (url === null) return;
        if (url != null) {
            if (!allowInsert) {
                url = url.replace("EnableInsert=true", "EnableInsert=false");
            }
            else if (!allowEdit) {
                url = url.replace("EnableInlineEdit=true", "EnableInlineEdit=false");
            }
            notescontrol.attr('url', url);
        } else {
            var src = notescontrol.attr('src');
            if (src != null) {
                if (!allowInsert) {
                    src = src.replace("EnableInsert=true", "EnableInsert=false");
                }
                else if (!allowEdit) {
                    src = src.replace("EnableInlineEdit=true", "EnableInlineEdit=false");
                }
                notescontrol.attr('src', src);
            }
        }
    };

    // Toolkit's public static members
    return {
        JQueryXrmFieldTooltip: jQueryXrmFieldTooltip,
        JQueryXrmDependentOptionSet: jQueryXrmDependentOptionSet,
        JQueryXrmCustomFilterView: jQueryXrmCustomFilterView,
        JQueryXrmFormatNotesControl: jQueryXrmFormatNotesControl
    };
}();
/*! jQuery v2.2.0 | (c) jQuery Foundation | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=a.document,e=c.slice,f=c.concat,g=c.push,h=c.indexOf,i={},j=i.toString,k=i.hasOwnProperty,l={},m="2.2.0",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return e.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:e.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a){return n.each(this,a)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(e.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:g,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=a&&a.toString();return!n.isArray(a)&&b-parseFloat(b)+1>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!k.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?i[j.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=d.createElement("script"),b.text=a,d.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(s(a)){for(c=a.length;c>d;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):g.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:h.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,g=0,h=[];if(s(a))for(d=a.length;d>g;g++)e=b(a[g],g,c),null!=e&&h.push(e);else for(g in a)e=b(a[g],g,c),null!=e&&h.push(e);return f.apply([],h)},guid:1,proxy:function(a,b){var c,d,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(d=e.call(arguments,2),f=function(){return a.apply(b||this,d.concat(e.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:l}),"function"==typeof Symbol&&(n.fn[Symbol.iterator]=c[Symbol.iterator]),n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){i["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=!!a&&"length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ga(),z=ga(),A=ga(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+M+"))|)"+L+"*\\]",O=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+N+")*)|.*)\\)|)",P=new RegExp(L+"+","g"),Q=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),R=new RegExp("^"+L+"*,"+L+"*"),S=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),T=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),U=new RegExp(O),V=new RegExp("^"+M+"$"),W={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M+"|[*])"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},X=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Z=/^[^{]+\{\s*\[native \w/,$=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,_=/[+~]/,aa=/'|\\/g,ba=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),ca=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},da=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(ea){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fa(a,b,d,e){var f,h,j,k,l,o,r,s,w=b&&b.ownerDocument,x=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==x&&9!==x&&11!==x)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==x&&(o=$.exec(a)))if(f=o[1]){if(9===x){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(w&&(j=w.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(o[2])return H.apply(d,b.getElementsByTagName(a)),d;if((f=o[3])&&c.getElementsByClassName&&b.getElementsByClassName)return H.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==x)w=b,s=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(aa,"\\$&"):b.setAttribute("id",k=u),r=g(a),h=r.length,l=V.test(k)?"#"+k:"[id='"+k+"']";while(h--)r[h]=l+" "+qa(r[h]);s=r.join(","),w=_.test(a)&&oa(b.parentNode)||b}if(s)try{return H.apply(d,w.querySelectorAll(s)),d}catch(y){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(Q,"$1"),b,d,e)}function ga(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ha(a){return a[u]=!0,a}function ia(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ja(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function ka(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function la(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function na(a){return ha(function(b){return b=+b,ha(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function oa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=fa.support={},f=fa.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fa.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ia(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ia(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Z.test(n.getElementsByClassName),c.getById=ia(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return"undefined"!=typeof b.getElementsByClassName&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=Z.test(n.querySelectorAll))&&(ia(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ia(function(a){var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Z.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ia(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",O)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Z.test(o.compareDocumentPosition),t=b||Z.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return ka(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?ka(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},fa.matches=function(a,b){return fa(a,null,null,b)},fa.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(T,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fa(b,n,null,[a]).length>0},fa.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fa.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fa.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fa.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fa.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fa.selectors={cacheLength:50,createPseudo:ha,match:W,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ba,ca),a[3]=(a[3]||a[4]||a[5]||"").replace(ba,ca),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fa.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fa.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return W.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&U.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ba,ca).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fa.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(P," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fa.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ha(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ha(function(a){var b=[],c=[],d=h(a.replace(Q,"$1"));return d[u]?ha(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ha(function(a){return function(b){return fa(a,b).length>0}}),contains:ha(function(a){return a=a.replace(ba,ca),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ha(function(a){return V.test(a||"")||fa.error("unsupported lang: "+a),a=a.replace(ba,ca).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Y.test(a.nodeName)},input:function(a){return X.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:na(function(){return[0]}),last:na(function(a,b){return[b-1]}),eq:na(function(a,b,c){return[0>c?c+b:c]}),even:na(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:na(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:na(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:na(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=la(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=ma(b);function pa(){}pa.prototype=d.filters=d.pseudos,d.setFilters=new pa,g=fa.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=R.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=S.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(Q," ")}),h=h.slice(c.length));for(g in d.filter)!(e=W[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fa.error(a):z(a,i).slice(0)};function qa(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function ra(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j,k=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(j=b[u]||(b[u]={}),i=j[b.uniqueID]||(j[b.uniqueID]={}),(h=i[d])&&h[0]===w&&h[1]===f)return k[2]=h[2];if(i[d]=k,k[2]=a(b,c,g))return!0}}}function sa(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ta(a,b,c){for(var d=0,e=b.length;e>d;d++)fa(a,b[d],c);return c}function ua(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function va(a,b,c,d,e,f){return d&&!d[u]&&(d=va(d)),e&&!e[u]&&(e=va(e,f)),ha(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ta(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ua(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ua(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ua(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function wa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ra(function(a){return a===b},h,!0),l=ra(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[ra(sa(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return va(i>1&&sa(m),i>1&&qa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(Q,"$1"),c,e>i&&wa(a.slice(i,e)),f>e&&wa(a=a.slice(e)),f>e&&qa(a))}m.push(c)}return sa(m)}function xa(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=F.call(i));u=ua(u)}H.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&fa.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ha(f):f}return h=fa.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xa(e,d)),f.selector=a}return f},i=fa.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ba,ca),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=W.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ba,ca),_.test(j[0].type)&&oa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qa(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,!b||_.test(a)&&oa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ia(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ia(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ja("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ia(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ja("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ia(function(a){return null==a.getAttribute("disabled")})||ja(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fa}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.uniqueSort=n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},v=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},w=n.expr.match.needsContext,x=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,y=/^.[^:#\[\.,]*$/;function z(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(y.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return h.call(b,a)>-1!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(z(this,a||[],!1))},not:function(a){return this.pushStack(z(this,a||[],!0))},is:function(a){return!!z(this,"string"==typeof a&&w.test(a)?n(a):a||[],!1).length}});var A,B=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=n.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||A,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:B.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),x.test(e[1])&&n.isPlainObject(b))for(e in b)n.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&f.parentNode&&(this.length=1,this[0]=f),this.context=d,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?void 0!==c.ready?c.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};C.prototype=n.fn,A=n(d);var D=/^(?:parents|prev(?:Until|All))/,E={children:!0,contents:!0,next:!0,prev:!0};n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=w.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?h.call(n(a),this[0]):h.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.uniqueSort(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function F(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return u(a,"parentNode")},parentsUntil:function(a,b,c){return u(a,"parentNode",c)},next:function(a){return F(a,"nextSibling")},prev:function(a){return F(a,"previousSibling")},nextAll:function(a){return u(a,"nextSibling")},prevAll:function(a){return u(a,"previousSibling")},nextUntil:function(a,b,c){return u(a,"nextSibling",c)},prevUntil:function(a,b,c){return u(a,"previousSibling",c)},siblings:function(a){return v((a.parentNode||{}).firstChild,a)},children:function(a){return v(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(E[a]||n.uniqueSort(e),D.test(a)&&e.reverse()),this.pushStack(e)}});var G=/\S+/g;function H(a){var b={};return n.each(a.match(G)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?H(a):n.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){n.each(b,function(b,c){n.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==n.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return n.each(arguments,function(a,b){var c;while((c=n.inArray(b,f,c))>-1)f.splice(c,1),h>=c&&h--}),this},has:function(a){return a?n.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().progress(c.notify).done(c.resolve).fail(c.reject):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=e.call(arguments),d=c.length,f=1!==d||a&&n.isFunction(a.promise)?d:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?e.call(arguments):d,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(d>1)for(i=new Array(d),j=new Array(d),k=new Array(d);d>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().progress(h(b,j,i)).done(h(b,k,c)).fail(g.reject):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(d,[n]),n.fn.triggerHandler&&(n(d).triggerHandler("ready"),n(d).off("ready"))))}});function J(){d.removeEventListener("DOMContentLoaded",J),a.removeEventListener("load",J),n.ready()}n.ready.promise=function(b){return I||(I=n.Deferred(),"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(n.ready):(d.addEventListener("DOMContentLoaded",J),a.addEventListener("load",J))),I.promise(b)},n.ready.promise();var K=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)K(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},L=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function M(){this.expando=n.expando+M.uid++}M.uid=1,M.prototype={register:function(a,b){var c=b||{};return a.nodeType?a[this.expando]=c:Object.defineProperty(a,this.expando,{value:c,writable:!0,configurable:!0}),a[this.expando]},cache:function(a){if(!L(a))return{};var b=a[this.expando];return b||(b={},L(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[b]=c;else for(d in b)e[d]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=a[this.expando];if(void 0!==f){if(void 0===b)this.register(a);else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in f?d=[b,e]:(d=e,d=d in f?[d]:d.match(G)||[])),c=d.length;while(c--)delete f[d[c]]}(void 0===b||n.isEmptyObject(f))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!n.isEmptyObject(b)}};var N=new M,O=new M,P=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Q=/[A-Z]/g;function R(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Q,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:P.test(c)?n.parseJSON(c):c}catch(e){}O.set(a,b,c);
}else c=void 0;return c}n.extend({hasData:function(a){return O.hasData(a)||N.hasData(a)},data:function(a,b,c){return O.access(a,b,c)},removeData:function(a,b){O.remove(a,b)},_data:function(a,b,c){return N.access(a,b,c)},_removeData:function(a,b){N.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=O.get(f),1===f.nodeType&&!N.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),R(f,d,e[d])));N.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){O.set(this,a)}):K(this,function(b){var c,d;if(f&&void 0===b){if(c=O.get(f,a)||O.get(f,a.replace(Q,"-$&").toLowerCase()),void 0!==c)return c;if(d=n.camelCase(a),c=O.get(f,d),void 0!==c)return c;if(c=R(f,d,void 0),void 0!==c)return c}else d=n.camelCase(a),this.each(function(){var c=O.get(this,d);O.set(this,d,b),a.indexOf("-")>-1&&void 0!==c&&O.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){O.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=N.get(a,b),c&&(!d||n.isArray(c)?d=N.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return N.get(a,c)||N.access(a,c,{empty:n.Callbacks("once memory").add(function(){N.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=N.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),U=["Top","Right","Bottom","Left"],V=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)};function W(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return n.css(a,b,"")},i=h(),j=c&&c[3]||(n.cssNumber[b]?"":"px"),k=(n.cssNumber[b]||"px"!==j&&+i)&&T.exec(n.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,n.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var X=/^(?:checkbox|radio)$/i,Y=/<([\w:-]+)/,Z=/^$|\/(?:java|ecma)script/i,$={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};$.optgroup=$.option,$.tbody=$.tfoot=$.colgroup=$.caption=$.thead,$.th=$.td;function _(a,b){var c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function aa(a,b){for(var c=0,d=a.length;d>c;c++)N.set(a[c],"globalEval",!b||N.get(b[c],"globalEval"))}var ba=/<|&#?\w+;/;function ca(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],o=0,p=a.length;p>o;o++)if(f=a[o],f||0===f)if("object"===n.type(f))n.merge(m,f.nodeType?[f]:f);else if(ba.test(f)){g=g||l.appendChild(b.createElement("div")),h=(Y.exec(f)||["",""])[1].toLowerCase(),i=$[h]||$._default,g.innerHTML=i[1]+n.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;n.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",o=0;while(f=m[o++])if(d&&n.inArray(f,d)>-1)e&&e.push(f);else if(j=n.contains(f.ownerDocument,f),g=_(l.appendChild(f),"script"),j&&aa(g),c){k=0;while(f=g[k++])Z.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var da=/^key/,ea=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,fa=/^([^.]*)(?:\.(.+)|)/;function ga(){return!0}function ha(){return!1}function ia(){try{return d.activeElement}catch(a){}}function ja(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)ja(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=ha;else if(!e)return this;return 1===f&&(g=e,e=function(a){return n().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=n.guid++)),a.each(function(){n.event.add(this,b,e,d,c)})}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=N.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return"undefined"!=typeof n&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(G)||[""],j=b.length;while(j--)h=fa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=N.hasData(a)&&N.get(a);if(r&&(i=r.events)){b=(b||"").match(G)||[""],j=b.length;while(j--)if(h=fa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&N.remove(a,"handle events")}},dispatch:function(a){a=n.event.fix(a);var b,c,d,f,g,h=[],i=e.call(arguments),j=(N.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.rnamespace||a.rnamespace.test(g.namespace))&&(a.handleObj=g,a.data=g.data,d=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==d&&(a.result=d)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&("click"!==a.type||isNaN(a.button)||a.button<1))for(;i!==this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>-1:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,e,f,g=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||d,e=c.documentElement,f=c.body,a.pageX=b.clientX+(e&&e.scrollLeft||f&&f.scrollLeft||0)-(e&&e.clientLeft||f&&f.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||f&&f.scrollTop||0)-(e&&e.clientTop||f&&f.clientTop||0)),a.which||void 0===g||(a.which=1&g?1:2&g?3:4&g?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,e,f=a.type,g=a,h=this.fixHooks[f];h||(this.fixHooks[f]=h=ea.test(f)?this.mouseHooks:da.test(f)?this.keyHooks:{}),e=h.props?this.props.concat(h.props):this.props,a=new n.Event(g),b=e.length;while(b--)c=e[b],a[c]=g[c];return a.target||(a.target=d),3===a.target.nodeType&&(a.target=a.target.parentNode),h.filter?h.filter(a,g):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==ia()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===ia()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ga:ha):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={constructor:n.Event,isDefaultPrevented:ha,isPropagationStopped:ha,isImmediatePropagationStopped:ha,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ga,a&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ga,a&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ga,a&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),n.fn.extend({on:function(a,b,c,d){return ja(this,a,b,c,d)},one:function(a,b,c,d){return ja(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=ha),this.each(function(){n.event.remove(this,a,c,b)})}});var ka=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,la=/<script|<style|<link/i,ma=/checked\s*(?:[^=]|=\s*.checked.)/i,na=/^true\/(.*)/,oa=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function pa(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a:a}function qa(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function ra(a){var b=na.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function sa(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(N.hasData(a)&&(f=N.access(a),g=N.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}O.hasData(a)&&(h=O.access(a),i=n.extend({},h),O.set(b,i))}}function ta(a,b){var c=b.nodeName.toLowerCase();"input"===c&&X.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}function ua(a,b,c,d){b=f.apply([],b);var e,g,h,i,j,k,m=0,o=a.length,p=o-1,q=b[0],r=n.isFunction(q);if(r||o>1&&"string"==typeof q&&!l.checkClone&&ma.test(q))return a.each(function(e){var f=a.eq(e);r&&(b[0]=q.call(this,e,f.html())),ua(f,b,c,d)});if(o&&(e=ca(b,a[0].ownerDocument,!1,a,d),g=e.firstChild,1===e.childNodes.length&&(e=g),g||d)){for(h=n.map(_(e,"script"),qa),i=h.length;o>m;m++)j=e,m!==p&&(j=n.clone(j,!0,!0),i&&n.merge(h,_(j,"script"))),c.call(a[m],j,m);if(i)for(k=h[h.length-1].ownerDocument,n.map(h,ra),m=0;i>m;m++)j=h[m],Z.test(j.type||"")&&!N.access(j,"globalEval")&&n.contains(k,j)&&(j.src?n._evalUrl&&n._evalUrl(j.src):n.globalEval(j.textContent.replace(oa,"")))}return a}function va(a,b,c){for(var d,e=b?n.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||n.cleanData(_(d)),d.parentNode&&(c&&n.contains(d.ownerDocument,d)&&aa(_(d,"script")),d.parentNode.removeChild(d));return a}n.extend({htmlPrefilter:function(a){return a.replace(ka,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=_(h),f=_(a),d=0,e=f.length;e>d;d++)ta(f[d],g[d]);if(b)if(c)for(f=f||_(a),g=g||_(h),d=0,e=f.length;e>d;d++)sa(f[d],g[d]);else sa(a,h);return g=_(h,"script"),g.length>0&&aa(g,!i&&_(a,"script")),h},cleanData:function(a){for(var b,c,d,e=n.event.special,f=0;void 0!==(c=a[f]);f++)if(L(c)){if(b=c[N.expando]){if(b.events)for(d in b.events)e[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);c[N.expando]=void 0}c[O.expando]&&(c[O.expando]=void 0)}}}),n.fn.extend({domManip:ua,detach:function(a){return va(this,a,!0)},remove:function(a){return va(this,a)},text:function(a){return K(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return ua(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=pa(this,a);b.appendChild(a)}})},prepend:function(){return ua(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=pa(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return ua(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return ua(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(_(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return K(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!la.test(a)&&!$[(Y.exec(a)||["",""])[1].toLowerCase()]){a=n.htmlPrefilter(a);try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(_(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return ua(this,arguments,function(b){var c=this.parentNode;n.inArray(this,a)<0&&(n.cleanData(_(this)),c&&c.replaceChild(b,this))},a)}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),f=e.length-1,h=0;f>=h;h++)c=h===f?this:this.clone(!0),n(e[h])[b](c),g.apply(d,c.get());return this.pushStack(d)}});var wa,xa={HTML:"block",BODY:"block"};function ya(a,b){var c=n(b.createElement(a)).appendTo(b.body),d=n.css(c[0],"display");return c.detach(),d}function za(a){var b=d,c=xa[a];return c||(c=ya(a,b),"none"!==c&&c||(wa=(wa||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=wa[0].contentDocument,b.write(),b.close(),c=ya(a,b),wa.detach()),xa[a]=c),c}var Aa=/^margin/,Ba=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ca=function(b){var c=b.ownerDocument.defaultView;return c.opener||(c=a),c.getComputedStyle(b)},Da=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e},Ea=d.documentElement;!function(){var b,c,e,f,g=d.createElement("div"),h=d.createElement("div");if(h.style){h.style.backgroundClip="content-box",h.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===h.style.backgroundClip,g.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",g.appendChild(h);function i(){h.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",h.innerHTML="",Ea.appendChild(g);var d=a.getComputedStyle(h);b="1%"!==d.top,f="2px"===d.marginLeft,c="4px"===d.width,h.style.marginRight="50%",e="4px"===d.marginRight,Ea.removeChild(g)}n.extend(l,{pixelPosition:function(){return i(),b},boxSizingReliable:function(){return null==c&&i(),c},pixelMarginRight:function(){return null==c&&i(),e},reliableMarginLeft:function(){return null==c&&i(),f},reliableMarginRight:function(){var b,c=h.appendChild(d.createElement("div"));return c.style.cssText=h.style.cssText="-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",h.style.width="1px",Ea.appendChild(g),b=!parseFloat(a.getComputedStyle(c).marginRight),Ea.removeChild(g),h.removeChild(c),b}})}}();function Fa(a,b,c){var d,e,f,g,h=a.style;return c=c||Ca(a),c&&(g=c.getPropertyValue(b)||c[b],""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),!l.pixelMarginRight()&&Ba.test(g)&&Aa.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function Ga(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Ha=/^(none|table(?!-c[ea]).+)/,Ia={position:"absolute",visibility:"hidden",display:"block"},Ja={letterSpacing:"0",fontWeight:"400"},Ka=["Webkit","O","Moz","ms"],La=d.createElement("div").style;function Ma(a){if(a in La)return a;var b=a[0].toUpperCase()+a.slice(1),c=Ka.length;while(c--)if(a=Ka[c]+b,a in La)return a}function Na(a,b,c){var d=T.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Oa(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+U[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+U[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+U[f]+"Width",!0,e))):(g+=n.css(a,"padding"+U[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+U[f]+"Width",!0,e)));return g}function Pa(b,c,e){var f=!0,g="width"===c?b.offsetWidth:b.offsetHeight,h=Ca(b),i="border-box"===n.css(b,"boxSizing",!1,h);if(d.msFullscreenElement&&a.top!==a&&b.getClientRects().length&&(g=Math.round(100*b.getBoundingClientRect()[c])),0>=g||null==g){if(g=Fa(b,c,h),(0>g||null==g)&&(g=b.style[c]),Ba.test(g))return g;f=i&&(l.boxSizingReliable()||g===b.style[c]),g=parseFloat(g)||0}return g+Oa(b,c,e||(i?"border":"content"),f,h)+"px"}function Qa(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=N.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&V(d)&&(f[g]=N.access(d,"olddisplay",za(d.nodeName)))):(e=V(d),"none"===c&&e||N.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Fa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Ma(h)||h),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=T.exec(c))&&e[1]&&(c=W(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(n.cssNumber[h]?"":"px")),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Ma(h)||h),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Fa(a,b,d)),"normal"===e&&b in Ja&&(e=Ja[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?Ha.test(n.css(a,"display"))&&0===a.offsetWidth?Da(a,Ia,function(){return Pa(a,b,d)}):Pa(a,b,d):void 0},set:function(a,c,d){var e,f=d&&Ca(a),g=d&&Oa(a,b,d,"border-box"===n.css(a,"boxSizing",!1,f),f);return g&&(e=T.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=n.css(a,b)),Na(a,c,g)}}}),n.cssHooks.marginLeft=Ga(l.reliableMarginLeft,function(a,b){return b?(parseFloat(Fa(a,"marginLeft"))||a.getBoundingClientRect().left-Da(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px":void 0}),n.cssHooks.marginRight=Ga(l.reliableMarginRight,function(a,b){return b?Da(a,{display:"inline-block"},Fa,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+U[d]+b]=f[d]||f[d-2]||f[0];return e}},Aa.test(a)||(n.cssHooks[a+b].set=Na)}),n.fn.extend({css:function(a,b){return K(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Ca(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Qa(this,!0)},hide:function(){return Qa(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){V(this)?n(this).show():n(this).hide()})}});function Ra(a,b,c,d,e){return new Ra.prototype.init(a,b,c,d,e)}n.Tween=Ra,Ra.prototype={constructor:Ra,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||n.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Ra.propHooks[this.prop];return a&&a.get?a.get(this):Ra.propHooks._default.get(this)},run:function(a){var b,c=Ra.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ra.propHooks._default.set(this),this}},Ra.prototype.init.prototype=Ra.prototype,Ra.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[n.cssProps[a.prop]]&&!n.cssHooks[a.prop]?a.elem[a.prop]=a.now:n.style(a.elem,a.prop,a.now+a.unit)}}},Ra.propHooks.scrollTop=Ra.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},n.fx=Ra.prototype.init,n.fx.step={};var Sa,Ta,Ua=/^(?:toggle|show|hide)$/,Va=/queueHooks$/;function Wa(){return a.setTimeout(function(){Sa=void 0}),Sa=n.now()}function Xa(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=U[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ya(a,b,c){for(var d,e=(_a.tweeners[b]||[]).concat(_a.tweeners["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Za(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&V(a),q=N.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?N.get(a,"olddisplay")||za(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Ua.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?za(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=N.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;N.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ya(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function $a(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function _a(a,b,c){var d,e,f=0,g=_a.prefilters.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Sa||Wa(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{},easing:n.easing._default},c),originalProperties:b,originalOptions:c,startTime:Sa||Wa(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for($a(k,j.opts.specialEasing);g>f;f++)if(d=_a.prefilters[f].call(j,a,k,j.opts))return n.isFunction(d.stop)&&(n._queueHooks(j.elem,j.opts.queue).stop=n.proxy(d.stop,d)),d;return n.map(k,Ya,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(_a,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return W(c.elem,a,T.exec(b),c),c}]},tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.match(G);for(var c,d=0,e=a.length;e>d;d++)c=a[d],_a.tweeners[c]=_a.tweeners[c]||[],_a.tweeners[c].unshift(b)},prefilters:[Za],prefilter:function(a,b){b?_a.prefilters.unshift(a):_a.prefilters.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(V).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=_a(this,n.extend({},a),f);(e||N.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=N.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Va.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=N.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Xa(b,!0),a,d,e)}}),n.each({slideDown:Xa("show"),slideUp:Xa("hide"),slideToggle:Xa("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Sa=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Sa=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Ta||(Ta=a.setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){a.clearInterval(Ta),Ta=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(b,c){return b=n.fx?n.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=d.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var ab,bb=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return K(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),e=n.attrHooks[b]||(n.expr.match.bool.test(b)?ab:void 0)),void 0!==c?null===c?void n.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=n.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(G);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)}}),ab={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=bb[b]||n.find.attr;bb[b]=function(a,b,d){var e,f;return d||(f=bb[b],bb[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,bb[b]=f),e}});var cb=/^(?:input|select|textarea|button)$/i,db=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return K(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&n.isXMLDoc(a)||(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b];
},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):cb.test(a.nodeName)||db.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var eb=/[\t\r\n\f]/g;function fb(a){return a.getAttribute&&a.getAttribute("class")||""}n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,fb(this)))});if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=fb(c),d=1===c.nodeType&&(" "+e+" ").replace(eb," ")){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=n.trim(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,fb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=fb(c),d=1===c.nodeType&&(" "+e+" ").replace(eb," ")){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=n.trim(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):n.isFunction(a)?this.each(function(c){n(this).toggleClass(a.call(this,c,fb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=n(this),f=a.match(G)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(void 0===a||"boolean"===c)&&(b=fb(this),b&&N.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":N.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+fb(c)+" ").replace(eb," ").indexOf(b)>-1)return!0;return!1}});var gb=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(gb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){return n.trim(a.value)}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],(c.selected||i===e)&&(l.optDisabled?!c.disabled:null===c.getAttribute("disabled"))&&(!c.parentNode.disabled||!n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(n.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>-1:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var hb=/^(?:focusinfocus|focusoutblur)$/;n.extend(n.event,{trigger:function(b,c,e,f){var g,h,i,j,l,m,o,p=[e||d],q=k.call(b,"type")?b.type:b,r=k.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!hb.test(q+n.event.triggered)&&(q.indexOf(".")>-1&&(r=q.split("."),q=r.shift(),r.sort()),l=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=r.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},f||!o.trigger||o.trigger.apply(e,c)!==!1)){if(!f&&!o.noBubble&&!n.isWindow(e)){for(j=o.delegateType||q,hb.test(j+q)||(h=h.parentNode);h;h=h.parentNode)p.push(h),i=h;i===(e.ownerDocument||d)&&p.push(i.defaultView||i.parentWindow||a)}g=0;while((h=p[g++])&&!b.isPropagationStopped())b.type=g>1?j:o.bindType||q,m=(N.get(h,"events")||{})[b.type]&&N.get(h,"handle"),m&&m.apply(h,c),m=l&&h[l],m&&m.apply&&L(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=q,f||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!L(e)||l&&n.isFunction(e[q])&&!n.isWindow(e)&&(i=e[l],i&&(e[l]=null),n.event.triggered=q,e[q](),n.event.triggered=void 0,i&&(e[l]=i)),b.result}},simulate:function(a,b,c){var d=n.extend(new n.Event,c,{type:a,isSimulated:!0});n.event.trigger(d,null,b),d.isDefaultPrevented()&&c.preventDefault()}}),n.fn.extend({trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),l.focusin="onfocusin"in a,l.focusin||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a))};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=N.access(d,b);e||d.addEventListener(a,c,!0),N.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=N.access(d,b)-1;e?N.access(d,b,e):(d.removeEventListener(a,c,!0),N.remove(d,b))}}});var ib=a.location,jb=n.now(),kb=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return(!c||c.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+b),c};var lb=/#.*$/,mb=/([?&])_=[^&]*/,nb=/^(.*?):[ \t]*([^\r\n]*)$/gm,ob=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,pb=/^(?:GET|HEAD)$/,qb=/^\/\//,rb={},sb={},tb="*/".concat("*"),ub=d.createElement("a");ub.href=ib.href;function vb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(G)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function wb(a,b,c,d){var e={},f=a===sb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function xb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function yb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function zb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:ib.href,type:"GET",isLocal:ob.test(ib.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":tb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?xb(xb(a,n.ajaxSettings),b):xb(n.ajaxSettings,a)},ajaxPrefilter:vb(rb),ajaxTransport:vb(sb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m=n.ajaxSetup({},c),o=m.context||m,p=m.context&&(o.nodeType||o.jquery)?n(o):n.event,q=n.Deferred(),r=n.Callbacks("once memory"),s=m.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,getResponseHeader:function(a){var b;if(2===v){if(!h){h={};while(b=nb.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===v?g:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return v||(a=u[c]=u[c]||a,t[a]=b),this},overrideMimeType:function(a){return v||(m.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>v)for(b in a)s[b]=[s[b],a[b]];else x.always(a[x.status]);return this},abort:function(a){var b=a||w;return e&&e.abort(b),z(0,b),this}};if(q.promise(x).complete=r.add,x.success=x.done,x.error=x.fail,m.url=((b||m.url||ib.href)+"").replace(lb,"").replace(qb,ib.protocol+"//"),m.type=c.method||c.type||m.method||m.type,m.dataTypes=n.trim(m.dataType||"*").toLowerCase().match(G)||[""],null==m.crossDomain){j=d.createElement("a");try{j.href=m.url,j.href=j.href,m.crossDomain=ub.protocol+"//"+ub.host!=j.protocol+"//"+j.host}catch(y){m.crossDomain=!0}}if(m.data&&m.processData&&"string"!=typeof m.data&&(m.data=n.param(m.data,m.traditional)),wb(rb,m,c,x),2===v)return x;k=n.event&&m.global,k&&0===n.active++&&n.event.trigger("ajaxStart"),m.type=m.type.toUpperCase(),m.hasContent=!pb.test(m.type),f=m.url,m.hasContent||(m.data&&(f=m.url+=(kb.test(f)?"&":"?")+m.data,delete m.data),m.cache===!1&&(m.url=mb.test(f)?f.replace(mb,"$1_="+jb++):f+(kb.test(f)?"&":"?")+"_="+jb++)),m.ifModified&&(n.lastModified[f]&&x.setRequestHeader("If-Modified-Since",n.lastModified[f]),n.etag[f]&&x.setRequestHeader("If-None-Match",n.etag[f])),(m.data&&m.hasContent&&m.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",m.contentType),x.setRequestHeader("Accept",m.dataTypes[0]&&m.accepts[m.dataTypes[0]]?m.accepts[m.dataTypes[0]]+("*"!==m.dataTypes[0]?", "+tb+"; q=0.01":""):m.accepts["*"]);for(l in m.headers)x.setRequestHeader(l,m.headers[l]);if(m.beforeSend&&(m.beforeSend.call(o,x,m)===!1||2===v))return x.abort();w="abort";for(l in{success:1,error:1,complete:1})x[l](m[l]);if(e=wb(sb,m,c,x)){if(x.readyState=1,k&&p.trigger("ajaxSend",[x,m]),2===v)return x;m.async&&m.timeout>0&&(i=a.setTimeout(function(){x.abort("timeout")},m.timeout));try{v=1,e.send(t,z)}catch(y){if(!(2>v))throw y;z(-1,y)}}else z(-1,"No Transport");function z(b,c,d,h){var j,l,t,u,w,y=c;2!==v&&(v=2,i&&a.clearTimeout(i),e=void 0,g=h||"",x.readyState=b>0?4:0,j=b>=200&&300>b||304===b,d&&(u=yb(m,x,d)),u=zb(m,u,x,j),j?(m.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(n.lastModified[f]=w),w=x.getResponseHeader("etag"),w&&(n.etag[f]=w)),204===b||"HEAD"===m.type?y="nocontent":304===b?y="notmodified":(y=u.state,l=u.data,t=u.error,j=!t)):(t=y,(b||!y)&&(y="error",0>b&&(b=0))),x.status=b,x.statusText=(c||y)+"",j?q.resolveWith(o,[l,y,x]):q.rejectWith(o,[x,y,t]),x.statusCode(s),s=void 0,k&&p.trigger(j?"ajaxSuccess":"ajaxError",[x,m,j?l:t]),r.fireWith(o,[x,y]),k&&(p.trigger("ajaxComplete",[x,m]),--n.active||n.event.trigger("ajaxStop")))}return x},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax(n.extend({url:a,type:b,dataType:e,data:c,success:d},n.isPlainObject(a)&&a))}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return n.isFunction(a)?this.each(function(b){n(this).wrapInner(a.call(this,b))}):this.each(function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return!n.expr.filters.visible(a)},n.expr.filters.visible=function(a){return a.offsetWidth>0||a.offsetHeight>0||a.getClientRects().length>0};var Ab=/%20/g,Bb=/\[\]$/,Cb=/\r?\n/g,Db=/^(?:submit|button|image|reset|file)$/i,Eb=/^(?:input|select|textarea|keygen)/i;function Fb(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||Bb.test(a)?d(a,e):Fb(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Fb(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Fb(c,a[c],b,e);return d.join("&").replace(Ab,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Eb.test(this.nodeName)&&!Db.test(a)&&(this.checked||!X.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(Cb,"\r\n")}}):{name:b.name,value:c.replace(Cb,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Gb={0:200,1223:204},Hb=n.ajaxSettings.xhr();l.cors=!!Hb&&"withCredentials"in Hb,l.ajax=Hb=!!Hb,n.ajaxTransport(function(b){var c,d;return l.cors||Hb&&!b.crossDomain?{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Gb[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=n("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Ib=[],Jb=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Ib.pop()||n.expando+"_"+jb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Jb.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Jb.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Jb,"$1"+e):b.jsonp!==!1&&(b.url+=(kb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?n(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Ib.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),l.createHTMLDocument=function(){var a=d.implementation.createHTMLDocument("").body;return a.innerHTML="<form></form><form></form>",2===a.childNodes.length}(),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||(l.createHTMLDocument?d.implementation.createHTMLDocument(""):d);var e=x.exec(a),f=!c&&[];return e?[b.createElement(e[1])]:(e=ca([a],b,f),f&&f.length&&n(f).remove(),n.merge([],e.childNodes))};var Kb=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Kb)return Kb.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(g,f||[a.responseText,b,a])})}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};function Lb(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,n.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(e=d.getBoundingClientRect(),c=Lb(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0)-a.scrollTop(),d.left+=n.css(a[0],"borderLeftWidth",!0)-a.scrollLeft()),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ea})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;n.fn[a]=function(d){return K(this,function(a,d,e){var f=Lb(a);return void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Ga(l.pixelPosition,function(a,c){return c?(c=Fa(a,b),Ba.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return K(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)},size:function(){return this.length}}),n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Mb=a.jQuery,Nb=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Nb),b&&a.jQuery===n&&(a.jQuery=Mb),n},b||(a.jQuery=a.$=n),n});
window.pandaDocjQuery = jQuery.noConflict(true);
window.jQuery = window.pandaDocjQuery;
window.$ = window.pandaDocjQuery;


if (!this.JSON) { this.JSON = {}; } (function () { function f(n) { return n < 10 ? '0' + n : n; } if (typeof Date.prototype.toJSON !== 'function') { Date.prototype.toJSON = function (key) { return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null; }; String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) { return this.valueOf(); }; } var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' }, rep; function quote(string) { escapable.lastIndex = 0; return escapable.test(string) ? '"' + string.replace(escapable, function (a) { var c = meta[a]; return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); }) + '"' : '"' + string + '"'; } function str(key, holder) { var i, k, v, length, mind = gap, partial, value = holder[key]; if (value && typeof value === 'object' && typeof value.toJSON === 'function') { value = value.toJSON(key); } if (typeof rep === 'function') { value = rep.call(holder, key, value); } switch (typeof value) { case 'string': return quote(value); case 'number': return isFinite(value) ? String(value) : 'null'; case 'boolean': case 'null': return String(value); case 'object': if (!value) { return 'null'; } gap += indent; partial = []; if (Object.prototype.toString.apply(value) === '[object Array]') { length = value.length; for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || 'null'; } v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']'; gap = mind; return v; } if (rep && typeof rep === 'object') { length = rep.length; for (i = 0; i < length; i += 1) { k = rep[i]; if (typeof k === 'string') { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); } } } } else { for (k in value) { if (Object.hasOwnProperty.call(value, k)) { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); } } } } v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}'; gap = mind; return v; } } if (typeof JSON.stringify !== 'function') { JSON.stringify = function (value, replacer, space) { var i; gap = ''; indent = ''; if (typeof space === 'number') { for (i = 0; i < space; i += 1) { indent += ' '; } } else if (typeof space === 'string') { indent = space; } rep = replacer; if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) { throw new Error('JSON.stringify'); } return str('', { '': value }); }; } if (typeof JSON.parse !== 'function') { JSON.parse = function (text, reviver) { var j; function walk(holder, key) { var k, v, value = holder[key]; if (value && typeof value === 'object') { for (k in value) { if (Object.hasOwnProperty.call(value, k)) { v = walk(value, k); if (v !== undefined) { value[k] = v; } else { delete value[k]; } } } } return reviver.call(holder, key, value); } text = String(text); cx.lastIndex = 0; if (cx.test(text)) { text = text.replace(cx, function (a) { return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); }); } if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) { j = eval('(' + text + ')'); return typeof reviver === 'function' ? walk({ '': j }, '') : j; } throw new SyntaxError('JSON.parse'); }; } } ());
//# sourceMappingURL=ICrmDataService.js.map
var PandaDoc;
(function (PandaDoc) {
    var Components;
    (function (Components) {
        var Infrastruction;
        (function (Infrastruction) {
            var DiscountCreator = /** @class */ (function () {
                function DiscountCreator() {
                }
                DiscountCreator.createPercentDiscount = function (discountValue) {
                    var result = { value: discountValue, global: false, type: 'percent' };
                    return result;
                };
                DiscountCreator.createAbsoluteDiscount = function (discountValue) {
                    var result = { value: discountValue, global: false, type: 'absolute' };
                    return result;
                };
                return DiscountCreator;
            }());
            Infrastruction.DiscountCreator = DiscountCreator;
        })(Infrastruction = Components.Infrastruction || (Components.Infrastruction = {}));
    })(Components = PandaDoc.Components || (PandaDoc.Components = {}));
})(PandaDoc || (PandaDoc = {}));
//# sourceMappingURL=DiscountCreator.js.map
var PandaDoc;
(function (PandaDoc) {
    var Components;
    (function (Components) {
        var Infrastruction;
        (function (Infrastruction) {
            var TaxCreator = /** @class */ (function () {
                function TaxCreator() {
                }
                TaxCreator.createPercentTax = function (taxValue) {
                    var result = { value: taxValue, global: false, type: 'percent' };
                    return result;
                };
                return TaxCreator;
            }());
            Infrastruction.TaxCreator = TaxCreator;
        })(Infrastruction = Components.Infrastruction || (Components.Infrastruction = {}));
    })(Components = PandaDoc.Components || (PandaDoc.Components = {}));
})(PandaDoc || (PandaDoc = {}));
//# sourceMappingURL=TaxCreator.js.map
///<reference path="../Infrastruction/ICrmDataService.ts" />
///<reference path="../Infrastruction/ConfigurationProvider.ts" />
///<reference path="../Infrastruction/CrmEntityToRecipientConverter.ts" />
///<reference path="../Infrastruction/Helper.ts" />
///<reference path="../Infrastruction/ConfigurationProvider.ts" />
var PandaDoc;
(function (PandaDoc) {
    var Components;
    (function (Components) {
        var Dal;
        (function (Dal) {
            var RepositoryFor2011EndPoint = /** @class */ (function () {
                function RepositoryFor2011EndPoint() {
                    this.pandadocDefaultTokens = {};
                    this.systemEntities = [];
                    this.xrmServiceToolkit = window.XrmServiceToolkit;
                    this.initDalSettings();
                    this.converter = new PandaDoc.Components.Infrastruction.CrmEntityToRecipientConverter();
                    this.configurationProvider = new PandaDoc.Components.Infrastruction.ConfigurationProvider();
                    this.pandadocDefaultTokens = this.configurationProvider.getPandaDocDegaultTokens();
                    this.systemEntities = this.configurationProvider.getSystemEntities();
                    this.$j = window.pandaDocjQuery;
                }
                RepositoryFor2011EndPoint.prototype.initDalSettings = function () {
                    this.oDataUrl = Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/";
                    this.entityName = Xrm.Page.data.entity.getEntityName();
                    this.entityId = Xrm.Page.data.entity.getId().replace("{", "").replace("}", "");
                    if (!this.entityId) {
                        throw new TypeError("This page doesn't contain information about entity.");
                    }
                };
                RepositoryFor2011EndPoint.prototype.retrievePicklistLabel = function (entityName, propertyName, value, data, token) {
                    var deferred = this.$j.Deferred();
                    this.retrieveAttributeMetadata(entityName, propertyName).then(function (metadata) {
                        if (!metadata) {
                            deferred.resolve();
                            return;
                        }
                        var label = metadata.OptionSet.Options.filter(function (o) { return o.Value === value; })[0].Label.UserLocalizedLabel.Label;
                        PandaDoc.Components.Infrastruction.Helper.setToken(data, token, label);
                        deferred.resolve();
                    });
                    return deferred.promise();
                };
                RepositoryFor2011EndPoint.prototype.fillProducts = function (data, entity) {
                    var deferred = this.$j.Deferred();
                    data.items = [];
                    if (window && window[this.entityName + "_getProducts"]) {
                        window[this.entityName + "_getProducts"](entity).then(function (products) {
                            data.items = products;
                            deferred.resolve();
                        });
                        return deferred.promise();
                    }
                    this.retrieveAndMapEntityProduct(data, deferred);
                    return deferred.promise();
                };
                RepositoryFor2011EndPoint.prototype.retrieveAndMapEntityProduct = function (data, deferred) {
                    deferred.resolve();
                };
                RepositoryFor2011EndPoint.prototype.buildFilter = function (tokensMapping) {
                    var result = tokensMapping
                        .filter(function (tm) { return tm.relationsPath.indexOf(".") > -1; })
                        .map(function (tm) {
                        var relationsPath = tm.relationsPath;
                        var b = relationsPath.split(".");
                        b.pop();
                        return b.join("/");
                    })
                        .reduce(function (prev, curr) {
                        if (prev.indexOf(curr) === -1) {
                            prev.push(curr);
                        }
                        return prev;
                    }, new Array());
                    return result.length > 0 ? "$expand=" + result.join(",") : "";
                };
                RepositoryFor2011EndPoint.prototype.retrieveEntity = function (entityName, entityId, filter) {
                    var deferred = this.$j.Deferred();
                    var repo = this;
                    this.retrieveEntitySchemaName(entityName).then(function (meta) {
                        repo.doRequest("" + repo.oDataUrl + repo.getEntitySetName(meta.SchemaName) + "(guid'" + entityId + "')" + (filter ? "?" + filter : "")).then(function (result) {
                            deferred.resolve(result);
                        });
                    });
                    return deferred.promise();
                };
                RepositoryFor2011EndPoint.prototype.retrieveCurrentUser = function (filter) {
                    return this.doRequest("" + this.oDataUrl + this.getEntitySetName("systemuser") + "(guid'" + Xrm.Page.context.getUserId() + "')" + (filter ? "?" + filter : ""));
                };
                RepositoryFor2011EndPoint.prototype.retrieveEntityMetadata = function (entityName) {
                    var deferred = this.$j.Deferred();
                    if (!this.xrmServiceToolkit) {
                        deferred.resolve(null);
                    }
                    else {
                        this.xrmServiceToolkit.Soap.RetrieveEntityMetadata(["Attributes"], entityName, true, function (result) {
                            deferred.resolve(result);
                        });
                    }
                    return deferred.promise();
                };
                RepositoryFor2011EndPoint.prototype.retrieveEntitySchemaName = function (entityName) {
                    var deferred = this.$j.Deferred();
                    if (!this.xrmServiceToolkit) {
                        deferred.resolve(null);
                    }
                    else {
                        this.xrmServiceToolkit.Soap.RetrieveEntityMetadata([], entityName, true, function (result) {
                            deferred.resolve(result[0]);
                        });
                    }
                    return deferred.promise();
                };
                RepositoryFor2011EndPoint.prototype.retrieveAttributeMetadata = function (entityName, propertyName) {
                    var deferred = this.$j.Deferred();
                    if (!this.xrmServiceToolkit) {
                        deferred.resolve(null);
                    }
                    else {
                        this.xrmServiceToolkit.Soap.RetrieveAttributeMetadata(entityName, propertyName, true, function (result) {
                            deferred.resolve(result[0]);
                        });
                    }
                    return deferred.promise();
                };
                RepositoryFor2011EndPoint.prototype.retrieveCollectionProperty = function (entityName, entityId, propertyName, filter) {
                    if (filter === void 0) { filter = ""; }
                    return this.doRequest("" + this.oDataUrl + this.getEntitySetName(entityName) + "(guid'" + entityId + "')/" + propertyName + (filter ? "?" + filter : ""));
                };
                RepositoryFor2011EndPoint.prototype.getEntitySetName = function (entityName) {
                    if (this.systemEntities.indexOf(entityName) > -1) {
                        if (entityName === "systemuser") {
                            return "SystemUserSet";
                        }
                        return PandaDoc.Components.Infrastruction.Helper.capitalizeFirstLetter(entityName) + "Set";
                    }
                    return entityName + "Set";
                };
                RepositoryFor2011EndPoint.prototype.doRequest = function (url) {
                    return this.$j.ajax({
                        type: "GET",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: encodeURI(url),
                        beforeSend: function (xmlHttpRequest) {
                            xmlHttpRequest.setRequestHeader("Accept", "application/json");
                        }
                    });
                };
                RepositoryFor2011EndPoint.prototype.getPropertyByPath = function (entity, relations, container) {
                    if (relations.length === 0 || !entity) {
                        var entityName = "";
                        if (container) {
                            var arrayNames = container.__metadata.type.split('.');
                            entityName = arrayNames[arrayNames.length - 1];
                        }
                        return { property: entity, container: entityName.toLowerCase() };
                    }
                    var p = relations.shift();
                    return this.getPropertyByPath(entity[p], relations, entity);
                };
                RepositoryFor2011EndPoint.prototype.getCustomersFromEntity = function (entity) {
                    var properties = [];
                    var keys = Object.keys(entity);
                    for (var i = 0; i < keys.length; i++) {
                        var key = keys[i];
                        if (!entity.hasOwnProperty(key)) {
                            continue;
                        }
                        if (!PandaDoc.Components.Infrastruction.Helper.isObject(entity[key])) {
                            continue;
                        }
                        var metadata = entity[key]["__metadata"];
                        if (!metadata || metadata.type !== "Microsoft.Crm.Sdk.Data.Services.EntityReference") {
                            continue;
                        }
                        if (entity[key].LogicalName !== "contact" && entity[key].LogicalName !== "account" && !(this.entityName === "opportunity" && key === "OwnerId")) {
                            continue;
                        }
                        var id = entity[key].Id;
                        if (properties.some(function (p) { return p.id === id; })) {
                            continue;
                        }
                        properties.push({ entityName: entity[key].LogicalName, id: id });
                    }
                    return properties;
                };
                RepositoryFor2011EndPoint.prototype.loadTokens = function (entityName) {
                    var _this = this;
                    var deferred = this.$j.Deferred();
                    var url = this.oDataUrl + "pandadoc_pandadoctokensmappingSet?$filter=pandadoc_name%20eq%20%27" + entityName + "%27&$select=pandadoc_name,pandadoc_tokens";
                    this.$j.getJSON(url).then(function (result) {
                        var loadedTokens;
                        if (!result.d.results || result.d.results.length === 0) {
                            loadedTokens = _this.pandadocDefaultTokens[entityName];
                        }
                        else {
                            loadedTokens = JSON.parse(result.d.results[0].pandadoc_tokens);
                        }
                        deferred.resolve(loadedTokens);
                    });
                    return deferred.promise();
                };
                return RepositoryFor2011EndPoint;
            }());
            Dal.RepositoryFor2011EndPoint = RepositoryFor2011EndPoint;
        })(Dal = Components.Dal || (Components.Dal = {}));
    })(Components = PandaDoc.Components || (PandaDoc.Components = {}));
})(PandaDoc || (PandaDoc = {}));
//# sourceMappingURL=RepositoryFor2011EndPoint.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
///<reference path="../../Dal/RepositoryFor2011EndPoint.ts" />
var PandaDoc;
(function (PandaDoc) {
    var Components;
    (function (Components) {
        var Dal;
        (function (Dal) {
            var Entities;
            (function (Entities) {
                var Opportunity2011EndPoint = /** @class */ (function (_super) {
                    __extends(Opportunity2011EndPoint, _super);
                    function Opportunity2011EndPoint() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    Opportunity2011EndPoint.prototype.retrieveAndMapEntityProduct = function (data, deferred) {
                        return __awaiter(this, void 0, void 0, function () {
                            var entityName, getCustomFieldsName, customFieldsName_1, productsMapper_1, booleanDefinitions_1, pickListDefinitions_1, ex_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 5, , 6]);
                                        entityName = 'opportunityproduct';
                                        return [4 /*yield*/, fetch("/api/data/v9.0/EntityDefinitions(LogicalName='" + entityName + "')?$select=LogicalName&$expand=Attributes($filter=IsCustomAttribute%20eq%20true)")];
                                    case 1:
                                        getCustomFieldsName = _a.sent();
                                        return [4 /*yield*/, getCustomFieldsName.json()];
                                    case 2:
                                        customFieldsName_1 = _a.sent();
                                        productsMapper_1 = new Entities.ProductsCustomFieldsMapper();
                                        return [4 /*yield*/, productsMapper_1.getBooleanDefinitions(entityName)];
                                    case 3:
                                        booleanDefinitions_1 = _a.sent();
                                        return [4 /*yield*/, productsMapper_1.getPickListDefinitions(entityName)];
                                    case 4:
                                        pickListDefinitions_1 = _a.sent();
                                        this.retrieveCollectionProperty(this.entityName, this.entityId, "product_opportunities", "$expand=opportunity_products&$orderby=SequenceNumber").then(function (result) {
                                            data.items = result.d.results.map(function (op) {
                                                var discountVolume = parseFloat(op.VolumeDiscountAmount.Value || 0);
                                                var discount = (discountVolume * parseFloat(op.Quantity || 0)) + parseFloat(op.ManualDiscountAmount.Value || 0);
                                                var product = {
                                                    sku: op.OpportunityProductId,
                                                    name: op.ProductDescription || (op.ProductId ? op.ProductId.Name : ""),
                                                    price: parseFloat(op.PricePerUnit.Value),
                                                    discount: {
                                                        value: discount,
                                                        type: "absolute",
                                                        global: false
                                                    },
                                                    tax_first: {
                                                        value: parseFloat(op.Tax.Value || 0),
                                                        type: "absolute",
                                                        global: false
                                                    },
                                                    qty: parseFloat(op.Quantity),
                                                    description: (op.opportunity_products && op.opportunity_products.Description) || op.Description || "",
                                                    currency: op.TransactionCurrencyId.Name || "",
                                                    custom_fields: {}
                                                };
                                                if (customFieldsName_1 && customFieldsName_1.Attributes) {
                                                    for (var _i = 0, _a = customFieldsName_1.Attributes; _i < _a.length; _i++) {
                                                        var attr = _a[_i];
                                                        if (productsMapper_1.isAttributeValidForToken(attr) &&
                                                            attr.DisplayName && attr.DisplayName.LocalizedLabels && attr.DisplayName.LocalizedLabels[0] && attr.DisplayName.LocalizedLabels[0].Label) {
                                                            product.custom_fields[attr.DisplayName.LocalizedLabels[0].Label] = productsMapper_1.mapField(op, attr, booleanDefinitions_1, pickListDefinitions_1);
                                                        }
                                                    }
                                                    ;
                                                }
                                                return product;
                                            });
                                            deferred.resolve();
                                        });
                                        return [3 /*break*/, 6];
                                    case 5:
                                        ex_1 = _a.sent();
                                        console.error(ex_1);
                                        return [3 /*break*/, 6];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        });
                    };
                    return Opportunity2011EndPoint;
                }(Dal.RepositoryFor2011EndPoint));
                Entities.Opportunity2011EndPoint = Opportunity2011EndPoint;
            })(Entities = Dal.Entities || (Dal.Entities = {}));
        })(Dal = Components.Dal || (Components.Dal = {}));
    })(Components = PandaDoc.Components || (PandaDoc.Components = {}));
})(PandaDoc || (PandaDoc = {}));
//# sourceMappingURL=Opportunity2011EndPoint.js.map
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var PandaDoc;
(function (PandaDoc) {
    var Components;
    (function (Components) {
        var Dal;
        (function (Dal) {
            var Entities;
            (function (Entities) {
                var ProductsCustomFieldsMapper = /** @class */ (function () {
                    function ProductsCustomFieldsMapper() {
                    }
                    ProductsCustomFieldsMapper.prototype.isAttributeValidForToken = function (attribute) {
                        var result = true;
                        var types = ["String", "Memo", "Integer", "Decimal", "Double", "DateTime", "Money", "Lookup", "Picklist", "Customer", "Boolean"];
                        if (attribute.AttributeOf || attribute.IsValidForCreate === "false") {
                            result = false;
                        }
                        if (attribute.SchemaName.indexOf("_Base") > 0 || attribute.SchemaName.indexOf("BehalfBy") > 0) {
                            result = false;
                        }
                        if (attribute.SchemaName === "Company") {
                            result = false;
                        }
                        if (types.indexOf(attribute.AttributeType) === -1) {
                            result = false;
                        }
                        return result;
                    };
                    ProductsCustomFieldsMapper.prototype.mapField = function (entity, attribute, booleanDefinitions, pickListDefinitions) {
                        var attrName = attribute.AttributeType;
                        var attributeValue = entity[attribute.SchemaName];
                        if (attributeValue === undefined || attributeValue === null) {
                            return '';
                        }
                        if (attrName === "Boolean") {
                            var booleanAttrData = booleanDefinitions.value.filter(function (m) { return m.LogicalName == attribute.LogicalName; });
                            if (attributeValue) {
                                return booleanAttrData[0].OptionSet.TrueOption.Label.LocalizedLabels[0].Label;
                            }
                            else {
                                return booleanAttrData[0].OptionSet.FalseOption.Label.LocalizedLabels[0].Label;
                            }
                        }
                        if (attrName === "Lookup") {
                            if (attributeValue.Name) {
                                return attributeValue.Name;
                            }
                            else
                                return '';
                        }
                        if (attrName === "Decimal" || attrName === "Double") {
                            if (attributeValue) {
                                return parseFloat(attributeValue).toFixed(2);
                            }
                            return '';
                        }
                        if (attrName === "Money") {
                            if (attributeValue.Value) {
                                return parseFloat(attributeValue.Value).toFixed(2);
                            }
                            return '';
                        }
                        if (typeof attributeValue === "string" && attributeValue.indexOf("/Date(") > -1) {
                            return PandaDoc.Components.Infrastruction.Helper.parseJsonDate(attributeValue);
                        }
                        if (typeof attributeValue === "string" && /^\d+\.\d+$/.test(attributeValue)) {
                            return parseFloat(attributeValue).toFixed(2);
                        }
                        if (attrName === "Picklist") {
                            return this.getPickListLabel(attribute.LogicalName, attributeValue, pickListDefinitions);
                        }
                        return (attributeValue === null || attributeValue === void 0 ? void 0 : attributeValue.toString()) || '';
                    };
                    ProductsCustomFieldsMapper.prototype.getPickListLabel = function (fieldLogicalName, fieldValue, pickListDefinitions) {
                        if (!fieldValue || !fieldValue.Value)
                            return '';
                        var optionSetData = pickListDefinitions.value.filter(function (m) { return m.LogicalName === fieldLogicalName; });
                        if (!optionSetData)
                            return '';
                        var optionSetParam = optionSetData[0].OptionSet.Options.filter(function (os) { return os.Value === fieldValue.Value; });
                        return optionSetParam[0].Label.LocalizedLabels[0].Label || '';
                    };
                    ProductsCustomFieldsMapper.prototype.getPickListDefinitions = function (entityName) {
                        return __awaiter(this, void 0, void 0, function () {
                            var definitions;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, fetch("/api/data/v9.0/EntityDefinitions(LogicalName='" + entityName + "')/Attributes/Microsoft.Dynamics.CRM.PicklistAttributeMetadata?$select=LogicalName&$expand=OptionSet")];
                                    case 1:
                                        definitions = _a.sent();
                                        return [4 /*yield*/, definitions.json()];
                                    case 2: return [2 /*return*/, _a.sent()];
                                }
                            });
                        });
                    };
                    ProductsCustomFieldsMapper.prototype.getBooleanDefinitions = function (entityName) {
                        return __awaiter(this, void 0, void 0, function () {
                            var definitions;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, fetch("/api/data/v9.0/EntityDefinitions(LogicalName='" + entityName + "')/Attributes/Microsoft.Dynamics.CRM.BooleanAttributeMetadata?$select=LogicalName&$expand=OptionSet")];
                                    case 1:
                                        definitions = _a.sent();
                                        return [4 /*yield*/, definitions.json()];
                                    case 2: return [2 /*return*/, _a.sent()];
                                }
                            });
                        });
                    };
                    return ProductsCustomFieldsMapper;
                }());
                Entities.ProductsCustomFieldsMapper = ProductsCustomFieldsMapper;
            })(Entities = Dal.Entities || (Dal.Entities = {}));
        })(Dal = Components.Dal || (Components.Dal = {}));
    })(Components = PandaDoc.Components || (PandaDoc.Components = {}));
})(PandaDoc || (PandaDoc = {}));
//# sourceMappingURL=ProductsCustomFieldsMapper.js.map
///<reference path="../../Dal/RepositoryFor2011EndPoint.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var PandaDoc;
(function (PandaDoc) {
    var Components;
    (function (Components) {
        var Dal;
        (function (Dal) {
            var Entities;
            (function (Entities) {
                var Quote2011EndPoint = /** @class */ (function (_super) {
                    __extends(Quote2011EndPoint, _super);
                    function Quote2011EndPoint() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    Quote2011EndPoint.prototype.retrieveAndMapEntityProduct = function (data, deferred) {
                        return __awaiter(this, void 0, void 0, function () {
                            var entityName, getCustomFieldsName, customFieldsName_1, productsMapper_1, booleanDefinitions_1, pickListDefinitions_1, ex_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 5, , 6]);
                                        entityName = 'quotedetail';
                                        return [4 /*yield*/, fetch("/api/data/v9.0/EntityDefinitions(LogicalName='" + entityName + "')?$select=LogicalName&$expand=Attributes($filter=IsCustomAttribute%20eq%20true)")];
                                    case 1:
                                        getCustomFieldsName = _a.sent();
                                        return [4 /*yield*/, getCustomFieldsName.json()];
                                    case 2:
                                        customFieldsName_1 = _a.sent();
                                        productsMapper_1 = new Entities.ProductsCustomFieldsMapper();
                                        return [4 /*yield*/, productsMapper_1.getBooleanDefinitions(entityName)];
                                    case 3:
                                        booleanDefinitions_1 = _a.sent();
                                        return [4 /*yield*/, productsMapper_1.getPickListDefinitions(entityName)];
                                    case 4:
                                        pickListDefinitions_1 = _a.sent();
                                        this.retrieveCollectionProperty(this.entityName, this.entityId, "quote_details", "$expand=product_quote_details&$orderby=SequenceNumber").then(function (result) {
                                            data.items = result.d.results.map(function (qd) {
                                                var discountVolume = parseFloat(qd.VolumeDiscountAmount.Value || 0);
                                                var discount = (discountVolume * parseFloat(qd.Quantity || 0)) + parseFloat(qd.ManualDiscountAmount.Value || 0);
                                                var mappedQuote = {
                                                    sku: qd.QuoteDetailId,
                                                    name: qd.ProductDescription || (qd.ProductId ? qd.ProductId.Name : ""),
                                                    price: parseFloat(qd.PricePerUnit.Value),
                                                    qty: parseFloat(qd.Quantity),
                                                    discount: {
                                                        value: discount,
                                                        type: "absolute",
                                                        global: false
                                                    },
                                                    tax_first: {
                                                        value: parseFloat(qd.Tax.Value || 0),
                                                        type: "absolute",
                                                        global: false
                                                    },
                                                    description: (qd.product_quote_details && qd.product_quote_details.Description) || qd.Description || "",
                                                    currency: qd.TransactionCurrencyId.Name || "",
                                                    custom_fields: {},
                                                };
                                                if (customFieldsName_1 && customFieldsName_1.Attributes) {
                                                    for (var _i = 0, _a = customFieldsName_1.Attributes; _i < _a.length; _i++) {
                                                        var attr = _a[_i];
                                                        if (productsMapper_1.isAttributeValidForToken(attr) &&
                                                            attr.DisplayName && attr.DisplayName.LocalizedLabels && attr.DisplayName.LocalizedLabels[0] && attr.DisplayName.LocalizedLabels[0].Label) {
                                                            mappedQuote.custom_fields[attr.DisplayName.LocalizedLabels[0].Label] = productsMapper_1.mapField(qd, attr, booleanDefinitions_1, pickListDefinitions_1);
                                                        }
                                                    }
                                                    ;
                                                }
                                                return mappedQuote;
                                            });
                                            deferred.resolve();
                                        });
                                        return [3 /*break*/, 6];
                                    case 5:
                                        ex_1 = _a.sent();
                                        console.error(ex_1);
                                        return [3 /*break*/, 6];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        });
                    };
                    return Quote2011EndPoint;
                }(Dal.RepositoryFor2011EndPoint));
                Entities.Quote2011EndPoint = Quote2011EndPoint;
            })(Entities = Dal.Entities || (Dal.Entities = {}));
        })(Dal = Components.Dal || (Components.Dal = {}));
    })(Components = PandaDoc.Components || (PandaDoc.Components = {}));
})(PandaDoc || (PandaDoc = {}));
//# sourceMappingURL=Quote2011EndPoint.js.map
///<reference path="../Infrastruction/ICrmDataService.ts" />
///<reference path="../Dal/RepositoryFor2011EndPoint.ts" />
var PandaDoc;
(function (PandaDoc) {
    var Components;
    (function (Components) {
        var Dal;
        (function (Dal) {
            var RepositoryCreator = /** @class */ (function () {
                function RepositoryCreator() {
                }
                RepositoryCreator.prototype.getRepositoryByEntityNameAndCRMVersion = function (entityName, version) {
                    var repository = null;
                    switch (entityName) {
                        case "opportunity": {
                            repository = new PandaDoc.Components.Dal.Entities.Opportunity2011EndPoint();
                            break;
                        }
                        case "quote": {
                            repository = new PandaDoc.Components.Dal.Entities.Quote2011EndPoint();
                            break;
                        }
                        default: {
                            repository = new Dal.RepositoryFor2011EndPoint();
                            break;
                        }
                    }
                    repository.initDalSettings();
                    return repository;
                };
                return RepositoryCreator;
            }());
            Dal.RepositoryCreator = RepositoryCreator;
        })(Dal = Components.Dal || (Components.Dal = {}));
    })(Components = PandaDoc.Components || (PandaDoc.Components = {}));
})(PandaDoc || (PandaDoc = {}));
//# sourceMappingURL=RepositoryCreator.js.map
var PandaDoc;
(function (PandaDoc) {
    var Components;
    (function (Components) {
        var Infrastruction;
        (function (Infrastruction) {
            var Helper = /** @class */ (function () {
                function Helper() {
                }
                Helper.isObject = function (val) {
                    return val !== null && typeof val === "object";
                };
                Helper.capitalizeFirstLetter = function (str) {
                    return str.charAt(0).toUpperCase() + str.slice(1);
                };
                Helper.parseJsonDate = function (jsonDateString) {
                    return new Date(parseInt(jsonDateString.replace("/Date(", ""))).toLocaleString();
                };
                Helper.setToken = function (data, name, value) {
                    data.tokens[name] = value;
                    data.widgets[name] = value;
                };
                return Helper;
            }());
            Infrastruction.Helper = Helper;
        })(Infrastruction = Components.Infrastruction || (Components.Infrastruction = {}));
    })(Components = PandaDoc.Components || (PandaDoc.Components = {}));
})(PandaDoc || (PandaDoc = {}));
//# sourceMappingURL=Helper.js.map
var PandaDoc;
(function (PandaDoc) {
    var Components;
    (function (Components) {
        var Infrastruction;
        (function (Infrastruction) {
            var CrmEntityToRecipientConverter = /** @class */ (function () {
                function CrmEntityToRecipientConverter() {
                }
                CrmEntityToRecipientConverter.prototype.accountToRecipient = function (account) {
                    if (!account || !account.EMailAddress1) {
                        return null;
                    }
                    var recipient = {};
                    recipient.email = account.EMailAddress1;
                    recipient.first_name = account.Name || "";
                    recipient.last_name = "";
                    if (account.Address1_Telephone1) {
                        recipient.phone = account.Address1_Telephone1;
                    }
                    return recipient;
                };
                CrmEntityToRecipientConverter.prototype.contactToRecipient = function (contact, entity) {
                    if (!contact || !contact.EMailAddress1) {
                        return null;
                    }
                    var recipient = {};
                    recipient.email = contact.EMailAddress1;
                    recipient.first_name = contact.FirstName || "";
                    recipient.last_name = contact.LastName || "";
                    if (contact.Address1_Telephone1) {
                        recipient.phone = contact.Address1_Telephone1;
                    }
                    if (contact.ParentCustomerId && contact.ParentCustomerId.Name) {
                        recipient.company = contact.ParentCustomerId.Name;
                    }
                    if (contact.Company) {
                        recipient.company = contact.Company;
                    }
                    recipient.Id = contact.ContactId
                    function findKey(id){
                        var _key = null
                        Object.keys(entity).forEach(function(key){
                            if(entity[key] && typeof entity[key] === "object" && 'Id' in entity[key]){
                                if( entity[key]['Id'] == id){
                                    _key = key 
                                }
                            }
                        })
                        return _key
                    }
                    try{
                        var key = findKey(contact.ContactId);
                        if(key) recipient.roleName = key

                    }catch(e) {
                        console.log(e)
                    }

                    
                    return recipient;
                };
                CrmEntityToRecipientConverter.prototype.userToRecipient = function (user) {
                    if (!user || !user.InternalEMailAddress) {
                        return null;
                    }
                    var recipient = {};
                    recipient.email = user.InternalEMailAddress;
                    recipient.first_name = user.FirstName || "";
                    recipient.last_name = user.LastName || "";
                    if (user.Address1_Telephone1) {
                        recipient.phone = user.Address1_Telephone1;
                    }
                    return recipient;
                };
                return CrmEntityToRecipientConverter;
            }());
            Infrastruction.CrmEntityToRecipientConverter = CrmEntityToRecipientConverter;
        })(Infrastruction = Components.Infrastruction || (Components.Infrastruction = {}));
    })(Components = PandaDoc.Components || (PandaDoc.Components = {}));
})(PandaDoc || (PandaDoc = {}));
//# sourceMappingURL=CrmEntityToRecipientConverter.js.map
var PandaDoc;
(function (PandaDoc) {
    var Components;
    (function (Components) {
        var Infrastruction;
        (function (Infrastruction) {
            var ConfigurationProvider = /** @class */ (function () {
                function ConfigurationProvider() {
                }
                ConfigurationProvider.prototype.getPandaDocDegaultTokens = function () {
                    return PandaDoc.Components.Infrastruction.ConfigurationProvider.pandadocDefaultTokens;
                };
                ConfigurationProvider.prototype.getSystemEntities = function () {
                    return PandaDoc.Components.Infrastruction.ConfigurationProvider.systemEntities;
                };
                ConfigurationProvider.prototype.getCurrentUserTokens = function () {
                    return PandaDoc.Components.Infrastruction.ConfigurationProvider.pandadocVirtualEntityDefaultTokens["currentUser"];
                };
                ConfigurationProvider.prototype.getDefaultEntitiesList = function () {
                    var result = [];
                    Object.keys(PandaDoc.Components.Infrastruction.ConfigurationProvider.pandadocDefaultTokens).map(function (key, index) {
                        result.push(key);
                    });
                    return result;
                };
                ConfigurationProvider.pandadocDefaultTokens = {
                    "opportunity": [
                        { "token": "Account.AccountNumber", "relationsPath": "opportunity_parent_account.AccountNumber" },
                        { "token": "Account.EMailAddress1", "relationsPath": "opportunity_parent_account.EMailAddress1" },
                        { "token": "Account.Fax", "relationsPath": "opportunity_parent_account.Fax" },
                        { "token": "Account.Name", "relationsPath": "opportunity_parent_account.Name" },
                        { "token": "Account.Telephone1", "relationsPath": "opportunity_parent_account.Telephone1" },
                        { "token": "Contact.EMailAddress1", "relationsPath": "opportunity_parent_contact.EMailAddress1" },
                        { "token": "Contact.Fax", "relationsPath": "opportunity_parent_contact.Fax" },
                        { "token": "Contact.First_Name", "relationsPath": "opportunity_parent_contact.FirstName" },
                        { "token": "Contact.FullName", "relationsPath": "opportunity_parent_contact.FullName" },
                        { "token": "Contact.Last_Name", "relationsPath": "opportunity_parent_contact.LastName" },
                        { "token": "Contact.Telephone1", "relationsPath": "opportunity_parent_contact.Telephone1" },
                        { "token": "Opportunity.Name", "relationsPath": "Name" },
                        { "token": "Opportunity.TotalAmount", "relationsPath": "TotalAmount" },
                        { "token": "Opportunity.TotalTax", "relationsPath": "TotalTax" }
                    ],
                    "quote": [
                        { "token": "Quote.Name", "relationsPath": "Name" },
                        { "token": "Quote.TotalAmount", "relationsPath": "TotalAmount" },
                        { "token": "Quote.TotalTax", "relationsPath": "TotalTax" }
                    ],
                    "contact": [
                        { "token": "Contact.EMailAddress1", "relationsPath": "EMailAddress1" },
                        { "token": "Contact.Fax", "relationsPath": "Fax" },
                        { "token": "Contact.First_Name", "relationsPath": "FirstName" },
                        { "token": "Contact.FullName", "relationsPath": "FullName" },
                        { "token": "Contact.Last_Name", "relationsPath": "LastName" },
                        { "token": "Contact.MobilePhone", "relationsPath": "MobilePhone" },
                        { "token": "Contact.Suffix", "relationsPath": "Suffix" },
                        { "token": "Contact.Telephone1", "relationsPath": "Telephone1" }
                    ],
                    "account": [
                        { "token": "Account.AccountNumber", "relationsPath": "AccountNumber" },
                        { "token": "Account.EMailAddress1", "relationsPath": "EMailAddress1" },
                        { "token": "Account.Fax", "relationsPath": "Fax" },
                        { "token": "Account.Name", "relationsPath": "Name" },
                        { "token": "Account.Telephone1", "relationsPath": "Telephone1" },
                        { "token": "Account.WebSiteURL", "relationsPath": "WebSiteURL" }
                    ]
                };
                ConfigurationProvider.pandadocVirtualEntityDefaultTokens = {
                    "currentUser": [
                        { "token": "CurrentUser.DomainName", "relationsPath": "DomainName" },
                        { "token": "CurrentUser.First_Name", "relationsPath": "FirstName" },
                        { "token": "CurrentUser.FullName", "relationsPath": "FullName" },
                        { "token": "CurrentUser.Last_Name", "relationsPath": "LastName" },
                        { "token": "CurrentUser.MobilePhone", "relationsPath": "MobilePhone" },
                        { "token": "CurrentUser.Address1_Telephone1", "relationsPath": "Address1_Telephone1" },
                        { "token": "CurrentUser.Address1_Fax", "relationsPath": "Address1_Fax" },
                    ]
                };
                ConfigurationProvider.systemEntities = [
                    "account", "activitymimeattachment", "activitypointer", "annotation", "appointment", "bulkoperation", "businessunit", "campaign", "campaignactivity",
                    "campaignresponse", "channelaccessprofile", "channelaccessprofilerule", "channelaccessprofileruleitem", "competitor", "competitoraddress", "connection",
                    "connectionrole", "contact", "contract", "contractdetail", "contracttemplate", "customeraddress", "customeropportunityrole", "discount", "discounttype",
                    "duplicaterule", "duplicaterulecondition", "email", "emailserverprofile", "entitlement", "entitlementtemplate", "equipment", "externalparty",
                    "externalpartyitem", "fax", "fieldpermission", "fieldsecurityprofile", "goal", "goalrollupquery", "importmap", "incident", "incidentresolution",
                    "internaladdress", "invoice", "invoicedetail", "kbarticle", "kbarticletemplate", "knowledgearticle", "knowledgearticleincident", "knowledgearticleviews",
                    "knowledgebaserecord", "lead", "leadaddress", "letter", "list", "mailbox", "mailmergetemplate", "metric", "opportunity", "opportunityclose",
                    "opportunityproduct", "orderclose", "organization", "phonecall", "position", "pricelevel", "processsession", "processstage", "processtrigger",
                    "product", "productassociation", "productpricelevel", "productsubstitute", "publisher", "queue", "queueitem", "quote", "quoteclose", "quotedetail",
                    "recurringappointmentmaster", "report", "reportcategory", "resource", "resourcegroup", "resourcegroupexpansion", "role", "roleprivileges", "rollupfield",
                    "salesliterature", "salesorder", "salesorderdetail", "savedquery", "savedqueryvisualization", "service", "serviceappointment", "sharepointdocument",
                    "sharepointdocumentlocation", "sharepointsite", "site", "sla", "slaitem", "slakpiinstance", "socialactivity", "socialprofile", "solution", "subject",
                    "systemuser", "task", "team", "teamtemplate", "template", "territory", "transactioncurrency", "uom", "uomschedule", "userquery", "userqueryvisualization",
                    "workflow"
                ];
                return ConfigurationProvider;
            }());
            Infrastruction.ConfigurationProvider = ConfigurationProvider;
        })(Infrastruction = Components.Infrastruction || (Components.Infrastruction = {}));
    })(Components = PandaDoc.Components || (PandaDoc.Components = {}));
})(PandaDoc || (PandaDoc = {}));
//# sourceMappingURL=ConfigurationProvider.js.map
/// <reference path="../EntityForms/Infrastruction/ICrmDataService.ts" />
/// <reference path="../EntityForms/Infrastruction/CrmEntityToRecipientConverter.ts" />
/// <reference path="../EntityForms/Infrastruction/Helper.ts" />
/// <reference path="../EntityForms/Dal/RepositoryCreator.ts" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var PandaDocToCrmApp = /** @class */ (function () {
    function PandaDocToCrmApp() {
        this.isPopupOpened = false;
        var container = window.top;
        if (container.pdSingle) {
            throw new Error("Error: Instantiation failed: Use PandaDocToCrmApp.getInstance() instead of new.");
        }
        container.pdSingle = this;
    }
    PandaDocToCrmApp.prototype.init = function () {
        var me = PandaDocToCrmApp.getInstance();
        me.$j = window.pandaDocjQuery;
        try {
            if (!me.isCorrectPageForRunning()) {
                me.showMeessageAboutImposibleToRunningComponent();
                return;
            }
            me.initDalSettings();
            me.initDependencies();
            me.initIFrameControl();
            me.decorateIFrame();
            me.initIFrameParentWindow();
        }
        catch (ex) {
            console.error(ex);
            me.showMeessageAboutImposibleToRunningComponent();
        }
    };
    PandaDocToCrmApp.getInstance = function () {
        var container = window.top;
        return container.pdSingle || new PandaDocToCrmApp();
    };
    PandaDocToCrmApp.clearInstance = function () {
        var container = window.top;
        container.pdSingle = null;
    };
    PandaDocToCrmApp.prototype.initDependencies = function () {
        var me = PandaDocToCrmApp.getInstance();
        me.converter = new PandaDoc.Components.Infrastruction.CrmEntityToRecipientConverter();
        me.configurationProvider = new PandaDoc.Components.Infrastruction.ConfigurationProvider();
        var repositoryCreator = new PandaDoc.Components.Dal.RepositoryCreator();
        me.repository = repositoryCreator.getRepositoryByEntityNameAndCRMVersion(me.entityName, "");
    };
    PandaDocToCrmApp.prototype.isCorrectPageForRunning = function () {
        if (!Xrm || !Xrm.Page || !Xrm.Page.context || !Xrm.Page.data || !Xrm.Page.data.entity) {
            return false;
        }
        return true;
    };
    PandaDocToCrmApp.prototype.initIFrameControl = function () {
        var me = PandaDocToCrmApp.getInstance();
        var iFrameName = "IFRAME_pandadoc";
        var iframeControl = Xrm.Page.getControl(iFrameName);
        if (!iframeControl) {
            throw new TypeError(iFrameName + " was not found.");
        }
        me.iframe = iframeControl.getObject();
        if (!me.iframe) {
            throw new TypeError("iFrame component not found.");
        }
    };
    PandaDocToCrmApp.prototype.initDalSettings = function () {
        var me = PandaDocToCrmApp.getInstance();
        me.entityName = Xrm.Page.data.entity.getEntityName();
        me.entityId = Xrm.Page.data.entity.getId().replace("{", "").replace("}", "");
        if (!me.entityId) {
            throw new TypeError("This page doesn't contain information about entity.");
        }
    };
    PandaDocToCrmApp.prototype.showMeessageAboutImposibleToRunningComponent = function () {
        console.log("It's imposible to running integration");
    };
    PandaDocToCrmApp.prototype.decorateIFrame = function () {
        var me = PandaDocToCrmApp.getInstance();
        me.iframe.style.borderColor = "#cccccc";
    };
    PandaDocToCrmApp.prototype.initIFrameParentWindow = function () {
        var me = PandaDocToCrmApp.getInstance();
        me.iframeParentWindow = me.iframe.contentWindow.parent;
    };
    PandaDocToCrmApp.prototype.parseWindowMessage = function (e) {
        var me = PandaDocToCrmApp.getInstance();
        var message = e.data.method;
        switch (message) {
            case "iFrameWasClosed": {
                me.showList(e);
                break;
            }
            case "openDocument": {
                me.openDocument(e);
                break;
            }
            case "createDocument": {
                me.createDocument(e);
                break;
            }
            case "openTokens": {
                me.openTokens(e);
                break;
            }
            case "sdk.document.update_draft_document.start": {
                me.refreshTokensInDraftDocument(e);
                break;
            }
            case "iFrameReady": {
                me.postDataIntoIFrame(e);
                break;
            }
        }
    };
    PandaDocToCrmApp.prototype.showList = function (e) {
        var me = PandaDocToCrmApp.getInstance();
        if (me.entityId === "") {
            return;
        }
        me.repository.retrieveEntity(me.entityName, me.entityId, "").then(function (retrieveEntityResult) {
            var entity = retrieveEntityResult.d;
            var data = e.data.data || {};
            me.fillBaseMetadata(data, entity);
            me.postMessage("showList", data, null);
        });
    };
    PandaDocToCrmApp.prototype.createDocument = function (e) {
        var me = PandaDocToCrmApp.getInstance();
        me.openPopup(me.generateParamsForCreatingDocument(e.data.data));
    };
    PandaDocToCrmApp.prototype.openDocument = function (e) {
        var me = PandaDocToCrmApp.getInstance();
        me.openPopup(me.generateParamsForOpenningDocument(e.data.data));
    };
    PandaDocToCrmApp.prototype.openTokens = function (e) {
        var me = PandaDocToCrmApp.getInstance();
        me.fillData(e.data.data, true).then(function (data) {
            me.postMessage("openTokens", data, null);
        });
    };
    PandaDocToCrmApp.prototype.refreshTokensInDraftDocument = function (e) {
        var me = PandaDocToCrmApp.getInstance();
        me.fillData(e.data.data, true).then(function (data) {
            me.postMessage("sdk.document.update_draft_document.receive_data", data, null);
        });
    };
    PandaDocToCrmApp.prototype.postDataIntoIFrame = function (e) {
        var me = PandaDocToCrmApp.getInstance();
        me.fillData(e.data.data, true).then(function (data) {
            if (e.data.data && e.data.data.documentId) {
                data.documentId = e.data.data.documentId;
            }
            me.postMessage(e.data.data.openMode, data, e.source);
        });
    };
    PandaDocToCrmApp.prototype.postMessage = function (method, data, sender) {
        var me = PandaDocToCrmApp.getInstance();
        var windowToPosting = sender || me.iframe.contentWindow;
        if (!windowToPosting) {
            return;
        }
        windowToPosting.postMessage({ method: method, data: data }, "*");
    };
    PandaDocToCrmApp.prototype.fillData = function (initialData, fillAllData) {
        var me = PandaDocToCrmApp.getInstance();
        var deferred = me.$j.Deferred();
        var data = initialData || {};
        me.repository.loadTokens(me.entityName).then(function (tokensMapping) {
            var filter = tokensMapping ? me.repository.buildFilter(tokensMapping) : "";
            tokensMapping = tokensMapping || [];
            me.repository.retrieveEntity(me.entityName, me.entityId, filter).then(function (retrieveEntityResult) {
                var userFilter = me.repository.buildFilter(me.configurationProvider.getCurrentUserTokens());
                me.repository.retrieveCurrentUser(userFilter).then(function (currentUser) {
                    var entity = retrieveEntityResult.d;
                    if (window && window[me.entityName + "_getData"]) {
                        window[me.entityName + "_getData"](entity).then(function (dataFromCustom) {
                            deferred.resolve(dataFromCustom);
                        });
                        return;
                    }
                    me.fillAllMetadata(data, entity);
                    if (!fillAllData) {
                        deferred.resolve(data);
                        return;
                    }
                    me.$j.when(me.fillTokens(data, entity, tokensMapping), me.fillTokens(data, currentUser.d, me.configurationProvider.getCurrentUserTokens()), me.fillRecipients(data, entity), me.fillProducts(data, entity)).then(function () {
                        deferred.resolve(data);
                    });
                });
            });
        });
        return deferred.promise();
    };
    PandaDocToCrmApp.prototype.fillBaseMetadata = function (data, entity) {
        var me = PandaDocToCrmApp.getInstance();
        data.metadata = {};
        data.metadata["msdynamics." + me.entityName + "_id"] = me.entityId.toLowerCase();
        return data;
    };
    PandaDocToCrmApp.prototype.fillAllMetadata = function (data, entity) {
        var me = PandaDocToCrmApp.getInstance();
        me.fillBaseMetadata(data, entity);
        if (me.entityName !== "opportunity") {
            return;
        }
        var customers = me.repository.getCustomersFromEntity(entity);
        for (var i = 0; i < customers.length; i++) {
            data.metadata["msdynamics." + customers[i].entityName + "_id"] = customers[i].id.toLowerCase();
        }
    };
    PandaDocToCrmApp.prototype.fillTokens = function (data, entity, tokensMapping) {
        return __awaiter(this, void 0, void 0, function () {
            var me, deferred, retrieves, i, tm, relations, result, resonse, attrData, booleanAttrData, metadata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        me = PandaDocToCrmApp.getInstance();
                        deferred = me.$j.Deferred();
                        data.tokens = data.tokens || { "__tokens": true };
                        data.widgets = data.widgets || { "__widgets": true };
                        retrieves = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < tokensMapping.length)) return [3 /*break*/, 6];
                        tm = tokensMapping[i];
                        relations = tm.relationsPath.split(".");
                        result = me.repository.getPropertyByPath(entity, relations, null);
                        if (result.property === undefined || result.property === null) {
                            return [3 /*break*/, 5];
                        }
                        if (!(typeof result.property === "boolean")) return [3 /*break*/, 4];
                        return [4 /*yield*/, fetch("/api/data/v9.0/EntityDefinitions(LogicalName='" + (result.container || me.entityName) + "')/Attributes/Microsoft.Dynamics.CRM.BooleanAttributeMetadata?$select=LogicalName&$expand=OptionSet")];
                    case 2:
                        resonse = _a.sent();
                        return [4 /*yield*/, resonse.json()];
                    case 3:
                        attrData = _a.sent();
                        booleanAttrData = attrData.value.filter(function (m) { return m.LogicalName == tm.relationsPath.split(".").pop().toLowerCase(); });
                        if (result.property) {
                            PandaDoc.Components.Infrastruction.Helper.setToken(data, tm.token, booleanAttrData[0].OptionSet.TrueOption.Label.LocalizedLabels[0].Label);
                        }
                        else {
                            PandaDoc.Components.Infrastruction.Helper.setToken(data, tm.token, booleanAttrData[0].OptionSet.FalseOption.Label.LocalizedLabels[0].Label);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        if (PandaDoc.Components.Infrastruction.Helper.isObject(result.property)) {
                            metadata = result.property["__metadata"];
                            if (!metadata || !metadata.type) {
                                return [3 /*break*/, 5];
                            }
                            if (metadata.type === "Microsoft.Crm.Sdk.Data.Services.EntityReference" && result.property.Name) {
                                PandaDoc.Components.Infrastruction.Helper.setToken(data, tm.token, result.property.Name);
                                return [3 /*break*/, 5];
                            }
                            if (metadata.type === "Microsoft.Crm.Sdk.Data.Services.Money" && result.property.Value) {
                                PandaDoc.Components.Infrastruction.Helper.setToken(data, tm.token, parseFloat(result.property.Value).toFixed(2));
                                return [3 /*break*/, 5];
                            }
                            if (metadata.type === "Edm.Decimal" && result.property.Value) {
                                PandaDoc.Components.Infrastruction.Helper.setToken(data, tm.token, parseFloat(result.property.Value).toFixed(2));
                                return [3 /*break*/, 5];
                            }
                            if (metadata.type === "Edm.Double" && result.property.Value) {
                                PandaDoc.Components.Infrastruction.Helper.setToken(data, tm.token, parseFloat(result.property.Value).toFixed(2));
                                return [3 /*break*/, 5];
                            }
                            if (metadata.type === "Microsoft.Crm.Sdk.Data.Services.OptionSetValue" && result.property.Value) {
                                retrieves.push(me.repository.retrievePicklistLabel(result.container || me.entityName, tm.relationsPath.split(".").pop().toLowerCase(), result.property.Value, data, tm.token));
                                return [3 /*break*/, 5];
                            }
                            return [3 /*break*/, 5];
                        }
                        if (typeof result.property === "string" && result.property.indexOf("/Date(") > -1) {
                            PandaDoc.Components.Infrastruction.Helper.setToken(data, tm.token, PandaDoc.Components.Infrastruction.Helper.parseJsonDate(result.property));
                            return [3 /*break*/, 5];
                        }
                        if (typeof result.property === "string" && /^\d+\.\d+$/.test(result.property)) {
                            PandaDoc.Components.Infrastruction.Helper.setToken(data, tm.token, parseFloat(result.property).toFixed(2));
                            return [3 /*break*/, 5];
                        }
                        PandaDoc.Components.Infrastruction.Helper.setToken(data, tm.token, result.property.toString());
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 1];
                    case 6:
                        if (retrieves.length > 0) {
                            me.$j.when.apply(me.$j, retrieves).then(function () {
                                deferred.resolve();
                            });
                        }
                        else {
                            deferred.resolve();
                        }
                        return [2 /*return*/, deferred.promise()];
                }
            });
        });
    };
    PandaDocToCrmApp.prototype.fillRecipients = function (data, entity) {
        try {
            data.recipients = [];
            var me = PandaDocToCrmApp.getInstance();
            var deferred = me.$j.Deferred();
            var customers = me.repository.getCustomersFromEntity(entity);
            var hasStandartRecipients = customers.length > 0;
            if (window && window[me.entityName + "_getRecipients"]) {
                window[me.entityName + "_getRecipients"](entity).then(function (recipients) {
                    data.recipients = recipients;
                    if (!hasStandartRecipients) {
                        deferred.resolve();
                    }
                });
            }
            var retrieves = new Array();
            for (var i = 0; i < customers.length; i++) {
                retrieves.push(me.repository.retrieveEntity(customers[i].entityName, customers[i].id, ""));
            }
            me.$j.when.apply(me.$j, retrieves).done(function (results) {
                for (var j = 0; j < arguments.length; j++) {
                    var result = customers.length > 1 ? arguments[j].d : arguments[0].d;
                    var type = result.__metadata.type.replace("Microsoft.Crm.Sdk.Data.Services.", "").toLowerCase();
                    if (type === "account") {
                        var account = me.converter.accountToRecipient(result);
                        if (account && data.recipients.every(function (r) { return r.email !== account.email; })) {
                            data.recipients.push(account);
                        }
                    }
                    else if (type === "contact") {
                        var contact = me.converter.contactToRecipient(result, entity);
                        entity
                        if (contact && data.recipients.every(function (r) { return r.email !== contact.email; })) {
                            data.recipients.push(contact);
                        }
                    }
                    else if (type === "systemuser") {
                        var user = me.converter.userToRecipient(result);
                        if (user && data.recipients.every(function (r) { return r.email !== user.email; })) {
                            data.recipients.push(user);
                        }
                    }
                }
                console.log('Recipients')
                console.log(data.recipients)

                deferred.resolve();
            });
        }
        catch (ex) {
            console.error(ex);
        }
        return deferred.promise();
    };
    PandaDocToCrmApp.prototype.fillProducts = function (data, entity) {
        data.items = [];
        var me = PandaDocToCrmApp.getInstance();
        return me.repository.fillProducts(data, entity);
    };
    PandaDocToCrmApp.prototype.openPopup = function (params) {
        var windowOptions = { openInNewWindow: true, height: 1500, width: 960 };
        Xrm.Navigation.openWebResource("/pandadoc_/Components/PandaDocPresenter/pandadoc.html", windowOptions, params);
    };
    PandaDocToCrmApp.prototype.generateParamsForCreatingDocument = function (data) {
        return "openMode=createDocument";
    };
    PandaDocToCrmApp.prototype.generateParamsForOpenningDocument = function (data) {
        if (Xrm.Internal.isUci()) {
            return "openMode=openDocument&documentId=" + data.documentId;
        }
        return encodeURIComponent("openMode=openDocument&documentId=" + data.documentId);
    };
    return PandaDocToCrmApp;
}());
function entityExist() {
    return Xrm.Page.data.entity.getId().replace("{", "").replace("}", "") !== "";
}
function staticWindowMessageParser(e) {
    var me = PandaDocToCrmApp.getInstance();
    me.parseWindowMessage(e);
}
function intervalCallback() {
    if (entityExist()) {
        PandaDocToCrmApp.getInstance().init();
        initPandaDoc();
        var container = window.top;
        container.clearInterval(container.pandaDocIntervalId);
    }
}
function initPandaDoc() {
    PandaDocToCrmApp.clearInstance();
    var me = PandaDocToCrmApp.getInstance();
    me.init();
    var intervalTimeout = 1000;
    if (entityExist()) {
        me.iframeParentWindow.removeEventListener("message", staticWindowMessageParser, false);
        me.iframeParentWindow.addEventListener("message", staticWindowMessageParser, true);
        console.log("subscription to message event was created");
        me.showList({ method: "ready", data: {} });
    }
    else {
        var container = window.top;
        container.pandaDocIntervalId = window.top.setInterval(intervalCallback, intervalTimeout);
    }
}
//# sourceMappingURL=pandadoc.to.crm.js.map