<template>
   <v-data-table
    :headers="headers"
    :items="datas"
    class="elevation-1"
  >
    <template slot="headerCell" slot-scope="props">
      <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
        <span>
          {{ props.header.text }}
        </span>
      </v-tooltip>
    </template>
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.votant }}</td>
      <td class="text-xs-right">{{ props.item.participant }}</td>
      <td class="text-xs-right">{{ props.item.abstenues }}</td>
      <td class="text-xs-right">{{ props.item.annules }}</td>
      <td class="text-xs-right">{{ props.item.voies }}</td>
    </template>
  </v-data-table>
</template>


<script>
export default {
  name: "DataTable",
  // props: ["data", "type", "options", "legend"],
  data() {
    return {
      headers: [
        {
          text: "Bureaux de votes",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Votant Enr.", value: "votant" },
        { text: "Participants", value: "participant" },
        { text: "Abstenues", value: "abstenues" },
        { text: "Bulletin null", value: "annules" },
        { text: "Voies obtenues", value: "voies" }
      ],
      datas: [
        {
          value: false,
          name: "Bureau 1",
          votant: 356,
          participant: 200,
          abstenues: 156,
          annules: 30,
          voies: "50%"
        },
        {
          value: false,
          name: "Bureau 2",
          votant: 350,
          participant: 20,
          abstenues: 15,
          annules: 30,
          voies: "80%"
        },
        {
          value: false,
          name: "Bureau 3",
          votant: 356,
          participant: 200,
          abstenues: 156,
          annules: 30,
          voies: "50%"
        },
        {
          value: false,
          name: "Bureau 4",
          votant: 356,
          participant: 200,
          abstenues: 156,
          annules: 30,
          voies: "50%"
        },
        {
          value: false,
          name: "Bureau 5",
          votant: 356,
          participant: 200,
          abstenues: 156,
          annules: 30,
          voies: "50%"
        }
      ]
    };
  }
};
</script>