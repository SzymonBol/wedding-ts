import { NgClass } from '@angular/common';
import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-quotations',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgClass],
  templateUrl: './quotations.component.html',
  styleUrl: './quotations.component.scss'
})
export class QuotationsComponent implements OnInit, OnDestroy{
  quotes: any[] = [
    {
      text: 'Coco jumbo i do przodu - to moje hasło, dobre nie?',
      author: 'Bolec',
      from: 'Chłopaki nie płaczą'
    },
    {
      text: 'Wszystko co czynicie, niech się dzieje w miłości',
      author: 'Św Paweł z Tarsu',
      from: 'I Koryntian'
    },
    {
      text: 'Co za ponury absurd… Żeby o życiu decydować za młodu, kiedy jest się kretynem?',
      author: 'Adam Miauczyński',
       from: 'Dzień Świra'
    },
    {
      text: 'Jesteś swój chłop. Heh, tak się tylko mówi. Oczywiście jesteś mój chłop!',
      author: 'Jan Paweł',
      from: '1670'
    },
    {
      text: 'Tyl­ko miłość może wyk­luczyć używa­nie jed­nej oso­by przez drugą.',
      author: 'Św Jan Paweł II'
    },
    {
      text: 'homo homini lupus est',
      author: 'ks. Jakub',
      from: '1670'
    },
    {
      text: 'Kochać to znaczy patrzeć w tym samym kierunku.',
      author: 'ks. Piotr Pawlukiewicz'
    },
    {
      text: 'Człowieku, nie bądź takim materialistą, trzeba się wyluzować',
      author: 'Laska',
      from: 'Chłopaki nie płaczą'
    },
    {
      text: 'Będziesz miłował Pana Boga swego z całego serca swego, z całej duszy swojej i ze wszystkich sił swoich, a bliźniego swego jak siebie samego.',
      author: 'Jezus Chrystus'
    },
    {
      text: 'Ja panu nie przerywałem!',
      author: 'Jan Paweł',
      from: '1670'
    },
    {
      text: 'Co to jest małżeństwo? Jest to wspólnota dwojga ludzi, którzy nieustannie sobie przebaczają.',
      author: 'ks. Piotr Pawlukiewicz'
    },
  ]

  duringChange = false;
  selectedQuoteIdx =signal(0);
  quote = computed(() => {
    return this.quotes[this.selectedQuoteIdx()];
  });
  intervalSubscription = new Subscription;

  ngOnInit(): void {
    this.intervalSubscription = interval(10000).subscribe(() => {
        this.nextQuote();
    });
  }

  manualNextQuote(){
    this.intervalSubscription.unsubscribe();
    this.nextQuote();
    this.intervalSubscription = interval(10000).subscribe(() => {
      this.nextQuote();
    });
  }

  manualPrevQuote(){
    this.intervalSubscription.unsubscribe();
    this.prevQuote();
    this.intervalSubscription = interval(10000).subscribe(() => {
      this.nextQuote();
    });
  }

  nextQuote(){
    this.duringChange = true;
    setTimeout(() => {
      const len = this.quotes.length-1;
      this.selectedQuoteIdx.update(v => v >= len ? 0 : v+1);
      this.duringChange = false;
    },700);
  }

  prevQuote(){
    this.duringChange = true;
    setTimeout(() => {
      const len = this.quotes.length-1;
      this.selectedQuoteIdx.update(v => v > 0 ? v-1 : len);
      this.duringChange = false;
    },700);    
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

}
