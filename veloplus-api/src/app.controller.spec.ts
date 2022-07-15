import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('home', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHome()).toBe('Hello World!');
    });
  });

  describe('getCompteurs', () => {
    it('should return all compteurs', () => {
      const compteurs = appController.getCompteurs("", "");
      expect(compteurs.length).toBe(56);
      expect(compteurs[0]["ID"]).toBe(38);

    });
  }
  );
  describe('getFontaines', () => {
    it('should return all fontaines', () => {
      const fontaines = appController.getFontaines("", "");
      expect(fontaines.length).toBe(848);
      expect(fontaines[0]["ID"]).toBe(1);
      expect(fontaines[0]["Arrondissement"]).toBe('Saint-Léonard');
      expect(fontaines[0]["Nom_parc_lieu"]).toBe('Delorme');
    }
    );
  }
  );
  describe('getCounterStats', () => {
    it('should return all counterStats', () => {
      const counterStats = appController.getCompteurStats(2020);
      expect(counterStats.length).toBe(8784);
    }
    );
  }
  );
  describe('getCompteur', () => {
    it('should return compteur', () => {
      const compteur = appController.getCompteur("100054585", 20200101, 20200131);
      expect(compteur["ID"]).toBe(100054585);
      expect(compteur["Ancien_ID"]).toBe(null);
      expect(compteur["Nom"]).toBe("Remembrance");
      expect(compteur["Statut"]).toBe("En maintenance");
      expect(compteur["Latitude"]).toBe(45.50160317511961);
      expect(compteur["Longitude"]).toBe(-73.59793406758837);
      expect(compteur["Annee_implante"]).toBe(2019);
    }
    );
  }
  );
  describe('getCompteur 2018', () => {
    it('should return compteur 2018', () => {
      const compteur = appController.getCompteur("100012218", 20180101, 20180101);
      expect(compteur["ID"]).toBe(100012218);
      expect(compteur["Ancien_ID"]).toBe(29);
      expect(compteur["Nom"]).toBe("Remembrance");
      expect(compteur["Statut"]).toBe("En maintenance");
      expect(compteur["Latitude"]).toBe(45.50160317511961);
      expect(compteur["Longitude"]).toBe(-73.59793406758837);
      expect(compteur["Annee_implante"]).toBe(2018);
    }
    );
  }
  );
});
