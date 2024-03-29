var explorerAuctionDetailView = Vue.component("ExplorerDetailView", {
  template: `
    <div>
        <v-nav></v-nav>
        <v-breadcrumb title="Auction Explorer" description="블록체인에 기록된 경매내역을 보여줍니다."></v-breadcrumb>
        <div class="container">
            <explorer-nav></explorer-nav>
            <div class="row">
                <div class="col-md-12">
                    <div class="alert alert-warning" v-if="contract && contract.highestBid == 0">
                        아직 경매에 참여한 이력이 없습니다.
                    </div>
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th colspan="2"># {{ contractAddress }}</th>
                            </tr> 
                        </thead>
                        <tbody>
                            <tr>
                                <th width="20%">Contract Address</th>
                                <td>{{ contractAddress }}</td>
                            </tr>
                            <tr>
                                <th width="20%">작품</th>
                                <td><router-link :to="{ name: 'work.detail', params: { id: work['id'] }}">{{ work && work['id'] }}</router-link></td>
                            </tr>
                            <tr>
                                <th>Status</th>
                                <td>
                                    <span class="badge badge-primary" v-if="contract && !contract.ended">Processing</span>
                                    <span class="badge badge-danger" v-if="contract && contract.ended">Ended</span>
                                </td>
                            </tr>
                            <tr>
                                <th>Start Time Time</th>
                                <td>{{ contract && contract.start_date.toLocaleString() }}</td>
                            </tr>
                            <tr>
                                <th>Expire Time</th>
                                <td>{{ contract && contract.end_date.toLocaleString() }}</td>
                            </tr>
                            <tr>
                                <th>Highest Bid</th>
                                <td>{{ contract && contract.highest_bid }} ETH</td>
                            </tr>
                            <tr>
                                <th>Highest Bidder</th>
                                <td>
                                    <span v-if="contract && contract.highest_bidder == 0">-</span>
                                    <span v-if="contract && contract.highest_bidder != 0">{{ contract && contract.highest_bidder }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    `,
  data() {
    return {
      contractAddress: "",
      contract: null,
      work: {
        id: 0
      }
    };
  },
  mounted: async function() {
    var scope = this;
    scope.contractAddress = this.$route.params.contractAddress;
    exploreService.findAuction(scope.contractAddress, function(data){
        var HighestBid = Number(data.highest_bid).toLocaleString().split(",").join("")
        data.highest_bid = web3.utils.fromWei(HighestBid, 'ether');
        scope.contract = data;
        console.log(data)
        scope.work.id = data.item_id;
    });
    /**
     * TODO 경매 컨트랙트로부터 경매 정보를 가져옵니다.
     */
  }
});
