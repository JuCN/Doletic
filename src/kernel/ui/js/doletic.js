
// ------------------------ DOLETIC MASTER INTERFACE CLASS  ----------------------------------

/**
 *  DoleticMasterInterface
 */
var DoleticMasterInterface = new function() {

  // Constantes --------------------------------
  this.module_container_id = "module_container";
  this.master_container_id = "master_container";
  // -------------------------------------------
  /**
   *  Render function, this function builds the content of the web page, 
   *  using the given module
   */
  this.render = function( htmlNode ) {
    // DEBUG message -----------------------------------------
    console.debug("DoleticMasterInterface.render : Starting rendering process.");
    // -----------------------------------------------------------
    // create doletic page standard HTML content
    var html = this.build();
    // set htmlElment innerHTML content
    htmlNode.innerHTML = html;
    // for each module call render function
    var htmlNode = document.getElementById(this.module_container_id);
    if(DoleticUIModule != null) {
      if(DoleticUIModule.super.meta.name != 'Login_UIModule' && 
         DoleticUIModule.super.meta.name != 'Logout_UIModule' &&
         DoleticUIModule.super.meta.name != '404_UIModule' &&
         DoleticUIModule.super.meta.name != 'Lost_UIModule') {
        // fill module submenu
        DoleticMasterInterface.fillModuleSubmenu();
      }
    // DEBUG message -----------------------------------------
    //console.debug("DoleticMasterInterface.render : Calling render for DoleticModuleInterface::"+DoleticUIModule.super.meta.name);
    // -----------------------------------------------------------
      DoleticUIModule.render(htmlNode);
    } else {

    // DEBUG message -----------------------------------------
    console.debug("DoleticMasterInterface.render : Calling render for DefaultDoleticUIModule ! ERROR !");
    // -----------------------------------------------------------
      DefaultDoleticUIModule.render(htmlNode);
    }
    
    // DEBUG message -----------------------------------------
    console.debug("DoleticMasterInterface.render : Rendering process finished.");
    // -----------------------------------------------------------
  }
  /**
   *  Build Doletic common ui
   */
  this.build = function() {
    var html = "<div id=\"left_menu\" class=\"ui vertical sticky menu fixed top\" style=\"left: 0px; top: 0px; width: 250px ! important; height: 1813px ! important; margin-top: 0px;\"> \
                  <a id=\"menu_doletic\" class=\"item\" onClick=\"DoleticServicesInterface.getUIHome();\"><img class=\"ui mini spaced image\" src=\"/resources/doletic_logo.png\">Doletic v2.0</a> \
                  <a id=\"menu_about_doletic\" class=\"item\" onClick=\"DoleticMasterInterface.showAboutDoletic();\"><i class=\"info circle icon\"></i>À propos de Doletic</a> \
                  <a id=\"menu_logout\" class=\"item\" onClick=\"DoleticServicesInterface.getUILogout();\"><i class=\"power icon\"></i>Déconnexion</a> \
                  <a id=\"menu_preferences_doletic\" class=\"item\" onClick=\"DoleticMasterInterface.showSettingsModal();\"><i class=\"settings icon\"></i>Préférences</a> \
                  <div id=\"module_submenu\" class=\"item\"> \
                    <!-- MODULES LINKS WILL GO HERE --> \
                  </div> \
                </div> \
                <div class=\"pusher\" style=\"margin-left: 60px;\"> \
                  <div class=\"ui container\"> \
                    <div id=\""+this.master_container_id+"\" class=\"ui one column centered grid container\"> \
                    <!-- kernel message goes here --> \
                    </div> \
                  </div> \
                  <div id=\""+this.module_container_id+"\"> \
                    <!-- module custom content goes here --> \
                  </div> \
                  <div id=\"about_doletic_modal\" class=\"ui basic modal\"> \
                    <i class=\"close icon\"></i> \
                    <div class=\"header\">Doletic v2.0</div> \
                    <div class=\"image content\"> \
                      <div class=\"image\"><i class=\"line chart icon\"></i></div> \
                      <div class=\"description\">  \
                        <p> \
                        Doletic est un ERP open-source destiné au Junior-Entreprises.<br><br> \
                        Son développement est à l'initiative du pôle DSI de la Junior-Entreprise de l'INSA de Lyon, \
                        ETIC INSA Technologies. Il est actuellement en cours de développement. \
                        Si vous souhaitez contribuer à ce merveilleux projet n'hésitez pas à nous contacter ! \
                        </p>  \
                        <p> \
                        Développeurs : \
                        <ul class=\"ui list\"> \
                          <li>Paul Dautry (ETIC INSA TEchnologies)</li> \
                          <li>Nicolas Sorin (ETIC INSA TEchnologies)</li> \
                        </ul> \
                        </p>  \
                      </div>  \
                    </div>  \
                    <div class=\"actions\"> \
                      <div class=\"one fluid ui inverted buttons\"> \
                        <div class=\"ui green basic inverted button\" onClick=\"DoleticMasterInterface.hideAboutDoletic();\"><i class=\"checkmark icon\"></i>Cool !</div>  \
                      </div> \
                    </div> \
                  </div> \
                </div> \
                <div id=\"confirm_modal\" class=\"ui basic modal\"> \
                  <div id=\"confirm_modal_header\" class=\"header\"><!-- Confirm modal header goes here --> \</div> \
                  <div class=\"image content\"> \
                    <div id=\"confirm_modal_icon\" class=\"image\"> \
                      <!-- Confirm modal icon goes here --> \
                    </div> \
                    <div id=\"confirm_modal_description\" class=\"description\"> \
                      <!-- Confirm modal description goes here --> \
                    </div> \
                  </div> \
                  <div class=\"actions\"> \
                    <div class=\"two fluid ui inverted buttons\"> \
                      <div id=\"confirm_modal_no\" class=\"ui red basic inverted button\"><i class=\"remove icon\"></i>Non</div> \
                      <div id=\"confirm_modal_yes\" class=\"ui green basic inverted button\"><i class=\"checkmark icon\"></i>Oui</div> \
                    </div> \
                  </div> \
                </div> \
                <div id=\"settings_modal\" class=\"ui modal\"> \
                  <div class=\"header\">Préférences</div> \
                  <div class=\"content\"> \
                    <p> Nothing here for now...</p> \
                  </div> \
                  <div class=\"actions\"> \
                    <div class=\"ui black deny button\" onClick=\"DoleticMasterInterface.hideSettingsModal();\">Annuler</div> \
                    <div class=\"ui positive right labeled icon button\" onClick=\"DoleticMasterInterface.applySettings();\">Sauvegarder<i class=\"checkmark icon\"></i></div> \
                  </div> \
                </div> \
                <div id=\"right_sidebar\" class=\"ui right sidebar vertical menu\"> \
                    <!-- Custom buttons can be added here by modules --> \
                </div>";
    return html;
  }

// ----------------------- DOLETIC INTERFACE COMMON FUNCTIONS ----------------------------------

  /**
   *  Removes logout button (usefull for login and logout interfaces)
   */
  this.removeUserNotLoggedUselessButtons = function() {
    $('#menu_logout').remove();
    $('#menu_preferences_doletic').remove();
  }
  /**
   *  Shows about Doletic modal
   */
  this.showAboutDoletic = function() {
    $('#about_doletic_modal').modal('show');
  }
  /**
   *  Hides about Doletic modal
   */
  this.hideAboutDoletic = function() {
    $('#about_doletic_modal').modal('hide');
  }
  /**
   *  Shows Doletic confirmation standard modal
   */  
  this.showConfirmModal = function(header, icon, question, yesHandler, noHandler) {
    $('#confirm_modal_header').html(header);
    $('#confirm_modal_icon').html(icon);
    $('#confirm_modal_description').html(question);
    $('#confirm_modal_no').click(noHandler);
    $('#confirm_modal_yes').click(yesHandler);
    $('#confirm_modal').modal('show');
  }
  /**
   *  Shows Doletic confirmation standard modal
   */
  this.hideConfirmModal = function() {
    $('#confirm_modal_header').html('');
    $('#confirm_modal_icon').html('');
    $('#confirm_modal_description').html('');
    $('#confirm_modal_no').click(function(){});
    $('#confirm_modal_yes').click(function(){});
    $('#confirm_modal').modal('hide');
  }
  /**
   *  Shows about Doletic modal
   */
  this.showSettingsModal = function() {
    $('#settings_modal').modal('show');
  }
  /**
   *  Hides about Doletic modal
   */
  this.hideSettingsModal = function() {
    $('#settings_modal').modal('hide');
  }
  /**
   *
   */
  this.applySettings = function() {
    // apply settings
    /// \todo create a night mode using inverted CSS class on elements which support it.
    // hide modal
    this.hideSettingsModal();
  }
  /**
   *  Shows right sidemenu
   */
  this.showRightSidemenu = function() {
    $('#right_sidebar').attr('class', 'ui right visible sidebar vertical menu');
  }
  /**
   *  Hides right sidemenu
   */
  this.hideRightSidemenu = function() {
    $('#right_sidebar').attr('class', 'ui right sidebar vertical menu');
  }
  /**
   *  Add content to right side menu
   */
  this.addRightSidemenuContent = function(content) {
    $('#right_sidebar').append(content);
  }
  /**
   *  Add content to right side menu
   */
  this.clearRightSidemenuContent = function() {
    $('#right_sidebar').html('');
  }
  /**
   *  Shows a message
   *  @param type : message type
   *  @param header : message title
   *  @param content : message content
   */
  this.showMessage = function(type, header, content) {
    $('#'+this.master_container_id).append(
    "<div class=\"column\"> \
      <div class=\"ui " + type + " message\"> \
        <i class=\"close icon\" onClick=\"this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);\" ></i> \
        <div class=\"header\">" + header + "</div>" + 
        content + 
      "</div> \
    </div>");
  }
  this.showInfo = function(title, msg) { this.showMessage('info', title, msg); }
  this.showSuccess = function(title, msg) { this.showMessage('success', title, msg); }
  this.showWarn = function(title, msg) { this.showMessage('warning', title, msg); }
  this.showError = function(title, msg) { this.showMessage('negative', title, msg); }
  /**
   *  Fills submodules submenu
   */
  this.fillModuleSubmenu = function() {
    DoleticServicesInterface.availableModuleLinks(function(data){
      // if no service error
      if(data.code == 0) {
        // create content var to build html
        var content = "";
        var json = JSON.parse(data.object);
        // iterate over values to build options
        for (var i = 0; i < json.length && json[i].length == 2; i++) {
          content += "<div> \
                        <div class=\"header\">"+json[i][0]+"</div> \
                          <div class=\"menu\">\n";
          for (var j = 0; j < json[i][1].length  && json[i][1][j].length == 2; j++) {
            content += "    <a class=\"item\" onClick=\"DoleticServicesInterface.getUI('"+
                              json[i][1][j][1]+"');\">"+
                              json[i][1][j][0]+"</a>\n";
          };
          content += "    </div> \
                        </div> \
                      </div>";
        };
        // insert html content
        $('#module_submenu').html(content);
      } else {
        // use default service service error handler
        DoleticServicesInterface.handleServiceError(data);
      }
    });           
  }

}

// ------------------------ DOLETIC DOCUMENT REDAY FUNCTION ------------------------------------

/**
 *  DOCUMENT READY : entry point
 */
$(document).ready(function(){
    // render page
    DoleticMasterInterface.render(document.getElementById('body'));
})