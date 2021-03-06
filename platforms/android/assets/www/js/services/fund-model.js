
angular.module('docman.fund-model', [])

.service('Funds', function( Offline,$rootScope,$q, Fund, Loading) {

  this.getAllFunds = function() {

    console.log("getting funds");
      if($rootScope.online)
      {
           var promise = firebase.database().ref('/funds')
          .once('value').then(function(snapshot) {
            var funds = [];
            snapshot.forEach(function(data) {
              var info = data.val();
              info.id = data.key;
              info.date = new Date(info.date);
              funds.push(new Fund(info));
              
            });
            Offline.saveFunds(funds);
            return $q.resolve(funds);
          });

        return Loading.progress(promise);
    }
    else
    {
      console.log("returning Offline funds");
      
      return $q.resolve(Offline.getAllFunds()); 
    }
  }

      this.getInvitess = function(email) {

          if ($rootScope.online) {
              var promise = firebase.database().ref('/followers')
                  .orderByChild('email').equalTo(email)
                  .once('value').then(function(snapshot) {
                      console.log('ere');
                      var invites = [];
                      snapshot.forEach(function(data) {
                          var info = data.val();
                          if (info.activities == 1) {
                              info.id = data.key;
                              info.date = new Date(info.date);
                              invites.push(info);
                          }
                      });
                      return $q.resolve(invites);
                  });

              return Loading.progress(promise);
          } else {


          }
      }

  this.getFundsByUser = function(uid) {
     if($rootScope.online)
     {
        console.log("getting funds for" + uid);
            var promise = firebase.database().ref('/funds')
              .orderByChild('uid').equalTo(uid)
              .once('value').then(function(snapshot) {
           
              
                var funds = [];
                snapshot.forEach(function(data) {
                  var info = data.val();
                  info.id = data.key;
                  info.date = new Date(info.date);
                  funds.push(new Fund(info));
                });
                return $q.resolve(funds);
              });

            return Loading.progress(promise); 
     }else
     {

        return $q.resolve(Offline.getFundsByUser(uid)); 

     }

  }

  this.getFund = function(fid) {


   if($rootScope.online)
   {

        var promise = firebase.database().ref('/funds/'+fid)
          .once('value').then(function(snapshot) {
            var info = snapshot.val();
            info.id = snapshot.key;
            info.date = new Date(info.date);
            return $q.resolve(new Fund(info));
          });

        return Loading.progress(promise); 
   }else
   {

        console.log('getting Offline model');
        return $q.resolve(Offline.getFundById(fid));
     
   }

  }

})

.factory('Fund', function() {

  function Fund (info) {

    info.performance_date = info.performance_date||0;
    this.id = (info && info.id) || null;
    this.uid = (info && info.uid) || null;




    this.full_name = (info && info.full_name) || 'Arowana Asian Fund Limiteds';
    this.manager = (info && info.manager) || 'Arowana Asset Management Ltd';
    this.advisor = (info && info.advisor) || 'N/A';
    this.fund_strategy = (info && info.fund_strategy) || 'Fund of Funds Asia with China Bias';
    this.regulatory_registrations = (info && info.regulatory_registrations) || 'SFC Type 4 and Type 9';
    this.portpolio_manager = (info && info.portpolio_manager) || 'Pierre Hoebrechts';
    this.coo = (info && info.coo) || 'Russell Davidson';
    this.inception_date = (info && info.inception_date) || 'January 1st 2011';
    this.aum = (info && info.aum) || '40m';
    this.firm_aum = (info && info.firm_aum) || '40m';
    this.administrator = (info && info.administrator) || 'Harmonic';
    this.auditor = (info && info.auditor) || 'KPMG';
	this.custodian = (info && info.custodian) || 'N/A';
    this.prime_broker = (info && info.prime_broker) || 'N/A';
    this.onshore_legal_counsel = (info && info.onshore_legal_counsel) || 'Simmons & Simmons';
    this.offshore_legal_counsel = (info && info.offshore_legal_counsel) || 'Walkers';
    this.subscriptions = (info && info.subscriptions) || 'Monthly';
    this.redemption = (info && info.redemption) || 'Monthly';
    this.notice_period = (info && info.notice_period) || '60 days';
    this.lock_up = (info && info.lock_up) || 'None';
    this.penalty_fee = (info && info.penalty_fee) || '2% within 12 months'
    this.fund_level = (info && info.fund_level) || 'None';
    this.investor_level = (info && info.investor_level) || 'None';
    this.minimum = (info && info.minimum) || '1000,000';
    this.management_pee = (info && info.management_pee) || '0.75%';
    this.performance_fee = (info && info.performance_fee) || '10%';
    this.hurdle_rate = (info && info.hurdle_rate) || '5%';
    this.loss_carry_forward = (info && info.loss_carry_forward) || 'Yes';
    this.high_water_mark = (info && info.high_water_mark) || 'Yes';
    this.bloomberg_ticker = (info && info.bloomberg_ticker) || '';
    this.mtd = (info && info.mtd) + "%" || '0%';
    this.ytd = (info && info.ytd) + "%" || '0%';
    this.avg = (info && info.avg) + "%" || '0%';
    this.strategy = (info && info.strategy) || 'strategy...';

    this.date = (info && info.date) || new Date();
    this.performance_date =new Date(info.performance_date)|| new Date();
    var options = {  day: 'numeric' , month: 'numeric', year: '2-digit' };
    this.performance_date_label = this.performance_date.toLocaleDateString("en-US", options);
    this.date_label = this.date.toLocaleDateString("en-US", options);
    options = { year: 'numeric', month: 'short' };
    
    /*this.performance_date_label = this.performance_date.toLocaleDateString("en-US", options);*/
    this.docs = [];

    console.log(this.full_name+"pdate: "+ this.performance_date);
  }

  return Fund;

})
