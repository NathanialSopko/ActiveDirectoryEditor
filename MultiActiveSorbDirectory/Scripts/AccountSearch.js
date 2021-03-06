var $rows = $('#userTable tr').not('thead tr');
$('#search').keyup(function () {
    var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

    $rows.show().filter(function () {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
        return !~text.indexOf(val);
    }).hide();
});

$(document).ready(function () {
    $rows.each(function () {
        if ($(this).find("td:nth(22)").text() === "Account Disabled") {
            $(this).addClass("highlight");
        }
    });
});



$('#userTable tbody').on('click', 'tr', function () {
    var table = $(this).closest("table");
    var currentRow = $(this);
    alias = $(this).find("td:nth(3)").text();
    $(".form-content").html("<h2>" + $(this).find("td:first").text() + "</h2><p>First Name: " +
        $(this).find("td:nth(1)").text() + "</p><p>Last Name: " + $(this).find("td:nth(2)").text() + "</p><p>Username: " + $(this).find("td:nth(3)").text() +
        "</p><p>Job Title: " + $(this).find("td:nth(4)").text() + "</p><p>Department: " + $(this).find("td:nth(5)").text() + "</p>");
    if ($(this).find("td:nth(22)").text() === "Account Disabled") {
        var modal = bootbox.dialog({
            message: $(".form-content").html(),
            title: "User Control Panel",
            buttons: [
              {
                  label: "Edit User",
                  className: "btn btn-primary pull-left",
                  callback: function () {
                      //call user save changes post
                      var url = "/EditUser/Index?alias=" + alias;
                      window.location.href = url;
                      return true;
                  }
              },
              {
                  label: "Enable User",
                  className: "btn btn-primary pull-left",
                  callback: function () {
                      $.ajax({
                          url: "/Home/enableUserFromName",
                          type: "POST",
                          data: {
                              sAMAccountName: alias
                          },
                          dataType: 'json',
                          success: function (response) {
                              if (response.success === true) {
                                  $("#userTable").find("td:contains('" + alias + "')").closest('tr').removeClass("highlight");
                                  $("#userTable").find("td:contains('" + alias + "')").closest('tr').find("td:nth(22)").html("Account Enabled");
                              }
                              else {
                                  alert("Enable didn't work, sorry.");
                              }
                          }
                      });
                  }
              },
              {
                  label: "Reset Password",
                  className: "btn btn-primary pull-left",
                  callback: function () {
                      $.ajax({
                          url: "/Home/resetPasswordFromName",
                          type: "POST",
                          data: {
                              sAMAccountName: alias
                          },
                          dataType: 'json',
                          success: function (response) {
                              if (response.success === true) {
                                  alert("Password successfully reset");
                              }
                              else {
                                  alert("Reset didn't work, sorry.");
                              }
                          }
                      });
                  }
              },
              {
                  label: "Unlock Account",
                  className: "btn btn-primary pull-left",
                  callback: function () {
                      $.ajax({
                          url: "/Home/unlockAccountFromName",
                          type: "POST",
                          data: {
                              sAMAccountName: alias
                          },
                          dataType: 'json',
                          success: function (response) {
                              if (response.success === true) {
                                  alert("Account Unlocked");
                              }
                              else {
                                  alert("Unlock didn't work, sorry.");
                              }
                          }
                      });
                  }
              },
              {
                  label: "Close",
                  className: "btn btn-default pull-right"
              }

            ],
            show: false,
            onEscape: function () {
                modal.modal("hide");
            }
        });
    }
    else {
        modal = bootbox.dialog({
            message: $(".form-content").html(),
            title: "User Control Panel",
            buttons: [
              {
                  label: "Edit User",
                  className: "btn btn-primary pull-left",
                  callback: function () {
                      var url = "/EditUser/Index?alias=" + alias;
                      window.location.href = url;
                      return true;
                  }
              },
              {
                  label: "Disable User",
                  className: "btn btn-primary pull-left",
                  callback: function () {
                      $.ajax({
                          url: "/Home/disableUserFromName",
                          type: "POST",
                          data: {
                              sAMAccountName: alias
                          },
                          dataType: 'json',
                          success: function (response) {
                              if (response.success === true) {
                                  $("#userTable").find("td:contains('" + alias + "')").closest('tr').addClass("highlight");
                                  $("#userTable").find("td:contains('" + alias + "')").closest('tr').find("td:nth(22)").html("Account Disabled");
                              }
                              else {
                                  alert("Disable didn't work, sorry.");
                              }
                          }
                      });
                  }
              },
              {
                  label: "Reset Password",
                  className: "btn btn-primary pull-left",
                  callback: function () {
                      $.ajax({
                          url: "/Home/resetPasswordFromName",
                          type: "POST",
                          data: {
                              sAMAccountName: alias
                          },
                          dataType: 'json',
                          success: function (response) {
                              if (response.success === true) {
                                  alert("Password successfully reset");
                              }
                              else {
                                  alert("Reset didn't work, sorry.");
                              }
                          }
                      });
                  }
              },
              {
                  label: "Unlock Account",
                  className: "btn btn-primary pull-left",
                  callback: function () {
                      $.ajax({
                          url: "/Home/unlockAccountFromName",
                          type: "POST",
                          data: {
                              sAMAccountName: alias
                          },
                          dataType: 'json',
                          success: function (response) {
                              if (response.success === true) {
                                  alert("Account Unlocked");
                              }
                              else {
                                  alert("Unlock didn't work, sorry.");
                              }
                          }
                      });
                  }
              },
              {
                  label: "Close",
                  className: "btn btn-default pull-right"
              }
            ],
            show: false,
            onEscape: function () {
                modal.modal("hide");
            }
        });
    }
    modal.modal("show");
    modal.off("shown.bs.modal");
});